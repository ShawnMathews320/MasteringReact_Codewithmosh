import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
    renderCell = (item, column) => {
        if (column.content) return column.content(item);  // if column.content exists we are going to call this function

        // otherwise if we don't have this property we are going to render the property of the current item
        return _.get(item, column.path);
    };

    // create unique key for items
    // we can combine the id of the item we are rendering with the path to the target property
    createKey = (item, column) => {
        return item._id + (column.path || column.key);
    }
    
    render() { 
        const { data, columns } = this.props;

        return (
            <tbody>
                { data.map(item =>  // list all items
                    <tr key={ item._id }>
                        { columns.map(column =>  // list all columns                            
                            <td key={ this.createKey(item, column) }>
                                {/* use bracket notation to access a property dynamically */}
                                {/* use lodash bc bracket notation doesn't work for nested properties */}
                                { this.renderCell(item, column) }  
                            </td>
                        )}
                    </tr>
                    )}
            </tbody>
        );
    }
}
 
export default TableBody;