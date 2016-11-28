import React from 'react';

import {
    Toolbar,
    BackButton,
    ToolbarButton,
    Icon
} from 'react-onsenui';

// const CattleEditTopBar = ({title, navigator, backFunction, editFunction}) => (
//     <Toolbar>
//       <div className='left'>
//         <BackButton onClick={() =>
//         {
//         if(backFunction)  {backFunction()}
//         navigator.popPage();}}>Back</BackButton>
//       </div>
//       <div className='center'>{title}</div>
//       <div className='right'>
//         <ToolbarButton>
//           <Icon icon='edit' onClick={() => {
//           if(editFunction)  {editFunction()}}}></Icon>
//         </ToolbarButton></div>
//     </Toolbar>
// );

class CattleEditTopBar extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    backFunction: React.PropTypes.func,
    editFunction: React.PropTypes.func
  };
  static defaultProps = {
    backFunction: null,
    editFunction:null
  };


  render()  {
    return(<Toolbar>
      <div className='left'>
        <BackButton onClick={() =>
        {
        if(this.props.backFunction)  {this.props.backFunction()}}}>Back</BackButton>
      </div>
      <div className='center'>{this.props.title}</div>
      <div className='right'>
        <ToolbarButton>
          <Icon icon='edit' onClick={() => {
          if(this.props.editFunction)  {this.props.editFunction()}}}></Icon>
        </ToolbarButton></div>
    </Toolbar>)
  }
}

export default CattleEditTopBar;