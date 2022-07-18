import style from './SortMenu.module.css';
import { connect } from 'react-redux';
import { sortByName, sortByYear } from '../../redux/actions';

function SortMenu(props: any): JSX.Element {
  console.log(props);
  return (
    <div className={style.sortMenu}>
      <select
        value={props.sort.sortByName}
        onChange={(e) => props.sortByName(e.target.value)}
        className={style.sortMenu__byName}
      >
        <option value="0" disabled>
          Sorting by name
        </option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <select
        value={props.sort.sortByYear}
        onChange={(e) => props.sortByYear(e.target.value)}
        className={style.sortMenu__byYear}
      >
        <option value="0" disabled>
          Sorting by year
        </option>
        <option value="earlier">Earlier</option>
        <option value="later">Later</option>
      </select>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    products: state.products.products,
    filter: state.filter,
    sort: state.sort,
  };
};
const mapDispatchToProps = {
  sortByName,
  sortByYear,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortMenu);
