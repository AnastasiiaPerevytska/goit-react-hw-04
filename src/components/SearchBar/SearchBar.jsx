import s from "./SearchBar.module.css";
import { toast } from 'react-hot-toast';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const searchQuery = event.target.query.value.trim();
    if (!searchQuery) {
      toast.error('The search field cannot be empty!');
      return;
    }
    onSubmit(searchQuery);
  };

  return (
    <header>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={s.input}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}