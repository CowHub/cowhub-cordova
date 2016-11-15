import React from 'react';
import {
    Page,
    Button,
    Toolbar,
    Icon,
    Input,
    ToolbarButton,
    Row,
    Col,
    List,
    ListItem

} from 'react-onsenui';


class CattleListItem extends React.Component {
  render() {

    return (
        <ListItem modifier="chevron" style={styles.listItemContainer}>
          <Row>
            <Col width="95px">
              <img src="http://placehold.it/350x150" style={styles.thumbnail} ></img>
            </Col>
            <Col>
              <div style={styles.name}>
                Cow 1
              </div>
              <div class={styles.desc}>
                Some other information
              </div>
            </Col>
            <Col width="40px"></Col>
          </Row>
        </ListItem>)
    }
  }

const styles ={
        listItemContainer: {
            lineHeight: '1',
            padding: '15px 0px 15px 15px'
        },
        thumbnail: {
          width: '80px',
          height: '80px',
          borderRadius: '4px'
        },
        name: {
          fontWeight: '500',
          lineHeight: '16px',
          fontSize: '15px',
          marginBottom: '6px'
        },
        desc: {
          lineHeight: '1.2',
          fontSize: '13px'
        }
}