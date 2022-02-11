import React, { Component } from 'react';

// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
    raiseSort = path => {
        const sortColumn = { ...this.props.sortColumn };  // clone existing sortColumn object

        if (sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc': 'asc';  // set it to opposite of what it currently is
        else {
            sortColumn.path = path;  // set new path if the path is different
            sortColumn.order = 'asc';  // should be ascending whenever we sort on a new column
        } 

        this.props.onSort(sortColumn);  // raise the sort event
    };

    render() { 
        return (
            <thead>
                <tr>
                    { this.props.columns.map(column => 
                        <th 
                            key={ column.path || column.key }
                            onClick={ () => this.raiseSort(column.path) }>
                            { column.label }
                        </th>
                    ) }
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;