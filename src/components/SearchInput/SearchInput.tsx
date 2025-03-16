import {
  useRef,
  useState,
  useCallback,
  ChangeEvent,
  FC,
} from 'react';
import debounce from 'lodash.debounce';
import { HiOutlineSearch } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';

import styles from './SearchInput.module.scss';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setSearchText } from '../../redux/filter/filter.slice';

const SearchInput: FC = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onClickClear = () => {
    dispatch(setSearchText(''));
    setValue('');
    inputRef.current?.focus();
  };

  const SetDebounceValue = useCallback(
    debounce(
      (value: string) => dispatch(setSearchText(value)),
      800
    ),
    [setSearchText]
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    SetDebounceValue(e.target.value);
  };

  return (
    <div className={styles.searchBlock}>
      <HiOutlineSearch
        className={styles.searchSvg}
        size={30}
      />
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск телефонов..."
        type="text"
        value={value}
        onChange={(e) => onChange(e)}
      />
      {value && (
        <RxCross2
          onClick={onClickClear}
          className={styles.resetSearchSvg}
          size={30}
        />
      )}
    </div>
  );
};

export default SearchInput;
