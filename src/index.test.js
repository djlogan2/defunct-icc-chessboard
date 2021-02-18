import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import ChessBoard from './index';
import Adapter from 'enzyme-adapter-react-16';
import BoardWrapper from "./components/BoardWrapper/BoardWrapper";
import Board from "./components/Board/Board";
import Files from "./components/Lines/Files";
import Ranks from "./components/Lines/Ranks";
import Square from "./components/Square/Square";

Enzyme.configure({adapter: new Adapter()});
describe('Chessboard with props', () => {
  const container = shallow(<ChessBoard ranksSide="right" filesSide="bottom" perspective="white"/>);
  it('should render correctly', () => {
    expect(container.html()).toMatchSnapshot();
  });

  it('should have no components inside', () => {
    const wrapper = mount(<ChessBoard ranksSide="right" filesSide="bottom" perspective="white"/>);

    expect(wrapper.find(<BoardWrapper/>)).toHaveLength(0);
    expect(wrapper.find(<Board/>)).toHaveLength(0);
    expect(wrapper.find(<Files/>)).toHaveLength(0);
    expect(wrapper.find(<Ranks/>)).toHaveLength(0);
  });
});

describe('BoardWrapper with props', () => {
  const container = shallow(<BoardWrapper size={100}/>);
  it('should render correctly', () => {
    expect(container.html()).toMatchSnapshot();
  });
});

describe('Board with props', () => {
  const container = shallow(<Board size={100}/>);
  it('should render correctly', () => {
    expect(container.html()).toMatchSnapshot();
  });
});

describe('Files with props', () => {
  const container = shallow(<Files width={100} side="bottom" perspective="white" />);
  it('should render correctly', () => {
    expect(container.html()).toMatchSnapshot();
  });
});

describe('Square with props', () => {
  const container = shallow(<Square color="color1" size={100} />);
  it('should render correctly', () => {
    expect(container.html()).toMatchSnapshot();
  });
});
