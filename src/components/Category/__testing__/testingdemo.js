import React, * as fromReact from 'react';
import { shallow } from 'enzyme';
import { Form } from '@gotitinc/design-system';
import { EditArchivedQuestion } from '../EditArchivedQuestion';

describe('components/Modals/EditArchivedQuestion', () => {
  let props;
  let wrapper;
  let useEffect;
  let inQuestionBankChecks;
  let tagSelection;
  const update = () => {
    wrapper.update();
    const body = shallow(<div>{wrapper.props().body}</div>);
    inQuestionBankChecks = body.find(Form.Check);
    tagSelection = body.find('[as="select"]');
  };
  const setup = () => {
    wrapper = shallow(<EditArchivedQuestion {...props} />);
    update();
  };
  beforeEach(() => {
    props = {
      id: 2,
      tags: [
        {
          id: 1,
          name: 'Tag1',
        },
        {
          id: 2,
          name: 'Tag2',
        },
      ],
      onModalClose: jest.fn(),
      editArchivedQuestion: jest.fn().mockResolvedValue({
        success: true,
      }),
      getSettings: jest.fn(),
      getQuestionDetails: jest.fn().mockResolvedValue({
        success: true,
        result: {
          inQuestionBank: true,
          tags: [{
            id: 1,
          }],
        },
      }),
    };
    useEffect = jest.spyOn(fromReact, 'useEffect');
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should get tags on mount', () => {
    useEffect.mockImplementationOnce((f) => f());
    setup();
    expect(props.getSettings).toHaveBeenCalledWith('tags');
  });
  it('should get question details on mount', async () => {
    useEffect.mockImplementationOnce(() => { });
    useEffect.mockImplementationOnce((f) => f());
    setup();
    await Promise.resolve();
    update();
    expect(inQuestionBankChecks.at(0).props().checked).toBe(true);
  });
  it('should handle changing send to question bank correctly', async () => {
    useEffect.mockImplementationOnce(() => { });
    useEffect.mockImplementationOnce((f) => f());
    setup();
    await Promise.resolve();
    update();
    inQuestionBankChecks.at(1).props().onChange({
      target: {
        value: 'no',
      },
    });
    update();
    expect(inQuestionBankChecks.at(0).props().checked).toBe(false);
    expect(inQuestionBankChecks.at(1).props().checked).toBe(true);
  });
  it('should handle changing tag correctly', async () => {
    useEffect.mockImplementationOnce(() => { });
    useEffect.mockImplementationOnce((f) => f());
    setup();
    await Promise.resolve();
    update();
    tagSelection.props().onChange({
      target: {
        value: 2,
      },
    });
    update();
    expect(tagSelection.props().value).toEqual(2);
  });
  it('should handle updating question correctly', async () => {
    useEffect.mockImplementationOnce(() => { });
    useEffect.mockImplementationOnce((f) => f());
    setup();
    await Promise.resolve();
    update();
    tagSelection.props().onChange({
      target: {
        value: 2,
      },
    });
    inQuestionBankChecks.at(1).props().onChange({
      target: {
        value: 'no',
      },
    });
    update();
    await wrapper.props().onClickPrimaryButton();
    expect(props.editArchivedQuestion).toHaveBeenCalledWith({
      id: 2,
      tagId: 2,
      inQuestionBank: false,
    });
    expect(props.onModalClose).toHaveBeenCalled();
  });
});
