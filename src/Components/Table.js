import React, {useState} from 'react';

import FilterBlock from "./FilterBlock";
import Pagination from "./Pagination";


const Table = ({dataTable, firstPageIndex, lastPageIndex, page, setPage, pageSize}) => {
  const [ search, setSearch ] = useState('');
  const [ colName, setColName ] = useState({
    value: 'name'
  });
  const [ conValue, setConValue ] = useState({
    value: 'equal'
  });

  // Записываем в состояние по какому столбцу будет проводится фильтрация
  const handleChangeCol = (event) => {
    const columns = event.target.value;
    setColName({value: columns});
  };
  // Записываем в состояние по какому условию будет проводится фильтрация
  const handleChangeCon = (event) => {
    const condition = event.target.value;
    setConValue({value: condition});
  };

  // Фильтруем таблицу по выбранной колонки и условию
  // Мемоизируем фильтрацию для избежания лишних ререндоров
  const filterData = React.useMemo(() => {
    return dataTable.filter((row) => {
      if ( !search) {
        return true;
      }

      const filterTarget = row[colName.value];

      switch (conValue.value) {
        case 'equal':
          return filterTarget === search;
        case 'contain':
          return filterTarget.toLowerCase().includes(search.toLowerCase());
        case 'more':
          return filterTarget > +search;
        case 'less':
          return filterTarget < +search;
        default:
          return false;
      }
    });
  }, [ dataTable, search, colName, conValue ]);

  // Выводим отфильтрованные данные по странично
  const pageData = filterData.slice(firstPageIndex, lastPageIndex);


  return (
    <div>
      <FilterBlock
        colName={colName}
        conValue={conValue}
        handleChangeCol={handleChangeCol}
        handleChangeCon={handleChangeCon}
        setSearch={setSearch}
      />
      <table className="table">
        <thead>
        <tr>
          <th>Дата</th>
          <th>Название</th>
          <th>Количество</th>
          <th>Расстояние</th>
        </tr>
        </thead>
        <tbody>
        {
          pageData.map((data) => (
            <tr key={data.name}>
              <td>{data.date}</td>
              <td>{data.name}</td>
              <td>{data.quantity}</td>
              <td>{data.distance}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
      <Pagination filterData={filterData} page={page} setPage={setPage} pageSize={pageSize}/>
    </div>
  );
};

export default Table;