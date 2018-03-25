# monster-maker
Simple app to make and manage a party of monsters

## ORM

The `config/orm.js` file contains the ORM used to access the database. The ORM object provides the following methods which may be chained to create queries.

* `.select(col1, col2, ... colN)` - Overload. Specifies the columns to select.
* `.select(colArray)` - Overload. Specifies the columns to select.
* `.from(table)` - Specifies the table to query.
* `.whereEquals(col, value)` - Specifies a WHERE clause
* `.leftJoin(table)` - Performs a left join on the specified table
* `.innerJoin(table)` - Performs an inner join on the specified table
* `.onEquals(col1, col2)` - Specifies an ON clause that specifies two columns be equal
* `.run()` - Compiles and submits a query and returns a promise that will resolve with the query response.
* `.then(cbSuccess, cbFailure)` - Convenience wrapper for `orm.run().then()`.
### Specifying Tables And Columns

A table or column may be specified as a simple string where context allows. Column names may take the format of `"columnName"` or `"tableName.columnName"`. The dotted names will be properly separated and escaped.

Column and table references can also be created using the following methods of the ORM object.

* `.col(name)` - Creates a reference to a column. The `"tableName.columnName"` form is allowed.
* `.col(name).as(alias)` - Creates a reference to a column using an alias.
* `.table(name)` - Creates a reference to a table.
* `.table(name).col(name)` - Creates a reference to a column.
* `.table(name).col(name).as(alias)` - Creates a reference to a column using an alias.
* `.as(col, alias)` - Convenince wrapper for `orm.col().as()`. Creates a reference to a column using an alias. The `"tableName.columnName"` form is allowed.

### Sample Usage

```javascript
// Very basic:
//    SELECT * FROM books
orm.select().from('books').then(data => console.log(data));

// A little more involved:
//    SELECT 
//      `game`.`year`, 
//      `game`.`genre`,
//      `game`.`name` AS `contentName`,
//      `publishers`.`name` AS `publisherName`
//    FROM `publishers`
//    INNER JOIN
//      ON `game`.`publisherId` = `publishers`.`id`
var content = orm.table('games'); // Could be books, films, etc.
var query = orm.select([
        content.col('year'),
        content.col('genre'),
        content.col('name').as('contentName'),
        orm.col('publishers.name').as('publisherName')
])  .from('publishers')
    .innerJoin(content)
    .onEquals(content.col('publisherId'), 'publishers.id')
    .then(data => {
        console.log(data);
    });
    
```