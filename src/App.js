import React, {useState} from "react";
import axios from "axios";

import Table from "./Components/Table";

function App() {
  const [ dataTable, setDataTable ] = React.useState([]);
  const [ pageSize ] = useState(5);
  const [ page, setPage ] = useState(1);

  // Устанавливаем первый и последний индекс для отображение записей в таблице по странично
  const firstPageIndex = (page - 1) * pageSize;
  const lastPageIndex = page * pageSize;


  // запрос записей из БД
  React.useEffect(() => {
    axios.get('http://localhost:3000/db.json')
      .then(({data}) => {
        setDataTable(data.data);
      });
  }, []);


  return (
    <div className="container">
      <Table
        dataTable={dataTable}
        firstPageIndex={firstPageIndex}
        lastPageIndex={lastPageIndex}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
      />

    </div>
  );
}

export default App;
