import style from './SortMenu.module.css';
import { connect } from 'react-redux';
import { sortByName, sortByYear } from '../../redux/actions';
import { ActionCreator, SortState, State } from '../../types/types';

type SortMenuProps = {
  sort: SortState;
  sortByName: ActionCreator<string>;
  sortByYear: ActionCreator<string>;
};

function SortMenu(props: SortMenuProps): JSX.Element {
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

const mapStateToProps = (state: State) => {
  return {
    sort: state.sort,
  };
};
const mapDispatchToProps = {
  sortByName,
  sortByYear,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortMenu);
