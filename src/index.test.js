import chai, { assert } from 'chai'
import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
// import ChessBoard from './index'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
// import BoardWrapper from './components/BoardWrapper/BoardWrapper'
// import Board from './components/Board/Board'
// import Files from './components/Lines/Files'
// import Ranks from './components/Lines/Ranks'
// import Square from './components/Square/Square'
import Piece from './components/Piece/Piece'
// import Circle from './components/Circle/Circle'
import LegalMove from './components/LegalMove/LegalMove'

Enzyme.configure({ adapter: new Adapter() })

// Chessboard
//   Board
//     PreviousMoveAlert
//     Square
//       LegalMove
//       Piece
//       Promotion
//       LegalMovesAlert
//   Edit
//   Files
//   Ranks
//   BoardWrapper

// TODO: LegalMoves needs to support an image for display
// TODO: As this shows, color is not even a prop!
describe('LegalMove component', function () {
  it('should work correctly with all props specified', function () {
    const wrapper = mount(<LegalMove size={10} color='#123' id='id1' />)
    const div = wrapper.find('div')
    const style = div.prop('style')
    assert.equal(div.prop('id'), 'id1')
    assert.equal(style.width, '10px')
    assert.equal(style.height, '10px')
    assert.equal(style.backgroundColor, '#123')
  })
  it('should allow the legal move visual element to be an image', function () {
    assert.fail('do me')
  })
})

describe('Piece component', function () {
  let props
  beforeEach(() => {
    props = {
      id: 'id1',
      pieceImage: 'url_goes_here',
      size: 12,
      pieceName: 'name_goes_here',
      currentPiece: '?',
      handlePieceClick: () => {},
      updateDataTransfer: () => {}
    }
  })
  it('should work correctly with all props', function () {
    const wrapper = mount(<Piece {...props} />)
    const div = wrapper.find('div')
    const style = div.prop('style')
    assert.equal(div.prop('id'), 'id1')
    assert.equal(style.backgroundImage, 'url(url_goes_here)')
    assert.equal(style.height, '12px')
    assert.equal(style.width, '12px')
    assert.equal(style.backgroundSize, '12px')
  })
  it('should support a transparent background color somehow', function () {
    assert.fail('do me')
  })

  //  id,
  it('should have the correct id', function () {
    // already done above
  })
  it('should not have the id attribute if it was not specified in the props', function () {
    delete props.id
    const wrapper = mount(<Piece {...props} />)
    const div = wrapper.find('div')
    const style = div.prop('style')
    assert.isUndefined(div.prop('id'))
  })

  //   pieceImage,
  it("should have the correct piece image", function(){
    // already done above
  });

  it("should probably display some type of default, like a question mark or something, if no image is specified", function(){
    delete props.pieceImage;
    const wrapper = mount(<Piece {...props} />)
    const div = wrapper.find('div')
    const style = div.prop('style')
    assert.equal(style.backgroundImage, 'url(some_default_image)')
  });
  //   size,
  it("should do what if size is not specified?", function(){
    delete props.size;
    const wrapper = mount(<Piece {...props} />)
    const div = wrapper.find('div')
    const style = div.prop('style')
    assert.isUndefined(style.height);
    assert.isUndefined(style.width);
    assert.isUndefined(style.backgroundSize);
  });
  it("should always call updateDataTransfer when a touch starts", function(){});
  //   pieceName <-- Only used in the functions below
  //   currentPiece <-- only used in the functions below
  //   handlePieceClick,
  //   updateDataTransfer
})
// describe('Chessboard with props', () => {
//   const container = shallow(
//     <ChessBoard ranksSide='right' filesSide='bottom' perspective='white' />
//   )
//   it('should render correctly', () => {
//     expect(container.html()).toMatchSnapshot()
//   })
//
//   it('should have no components inside', () => {
//     const wrapper = mount(
//       <ChessBoard ranksSide='right' filesSide='bottom' perspective='white' />
//     )
//
//     expect(wrapper.find(<BoardWrapper />)).toHaveLength(0)
//     expect(wrapper.find(<Board />)).toHaveLength(0)
//     expect(wrapper.find(<Files />)).toHaveLength(0)
//     expect(wrapper.find(<Ranks />)).toHaveLength(0)
//   })
// })
//
// describe('BoardWrapper with props', () => {
//   const container = shallow(<BoardWrapper size={100} />)
//   it('should render correctly', () => {
//     expect(container.html()).toMatchSnapshot()
//   })
// })
//
// describe('Board with props', () => {
//   const container = shallow(<Board size={100} />)
//   it('should render correctly', () => {
//     expect(container.html()).toMatchSnapshot()
//   })
// })
//
// describe('Files with props', () => {
//   const container = shallow(
//     <Files width={100} side='bottom' perspective='white' />
//   )
//   it('should render correctly', () => {
//     expect(container.html()).toMatchSnapshot()
//   })
// })
//
// describe('Square with props', () => {
//   const container = shallow(
//     <Square color='color1' size={100} isLegal={false} circle={false} />
//   )
//   it('should render correctly', () => {
//     expect(container.html()).toMatchSnapshot()
//   })
// })
//
// describe('Piece with props', () => {
//   const container = shallow(
//     <Piece pieceImage='src' description='piece' size={100} />
//   )
//   it('should render correctly', () => {
//     expect(container.html()).toMatchSnapshot()
//   })
// })
//
// describe('Circle with props', () => {
//   const container = shallow(<Circle size={100} />)
//   it('should render correctly', () => {
//     expect(container.html()).toMatchSnapshot()
//   })
// })
//
// describe('LegalMove with props', () => {
//   const container = shallow(<LegalMove size={100} />)
//
//   it('should render correctly', () => {
//     expect(container.html()).toMatchSnapshot()
//   })
// })
