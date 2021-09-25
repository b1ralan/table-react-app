import React from 'react';

const FilterBlock = ({colName, conValue, handleChangeCol, handleChangeCon, setSearch}) => {


  return (
    <div className="input-group m-3">
      <label>
        Выберите столбец
        <select value={colName.value} onChange={handleChangeCol} className="custom-select">
          <option value="name">Название</option>
          <option value="quantity">Количество</option>
          <option value="distance">Расстояние</option>
        </select>
      </label>
      {
        colName.value === 'name' ?
          <label className="ml-3">
            Выберите условие
            <select value={conValue.value} onChange={handleChangeCon} className="custom-select">
              <option value="equal">Равно</option>
              <option value="contain">Содержит</option>
            </select>
          </label>
          :
          <label className="ml-3">
            Выберите условие
            <select value={conValue.value} onChange={handleChangeCon} className="custom-select">
              <option value="equal">Равно</option>
              <option value="contain">Содержит</option>
              <option value="more">Больше</option>
              <option value="less">Меньше</option>
            </select>
          </label>
      }
      <input className="form-control m-4"
             type="text"
             onChange={(event) => {
               setSearch(event.target.value);
             }}
      />
    </div>
  );
};

export default FilterBlock;