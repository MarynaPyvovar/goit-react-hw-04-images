import { Grid } from 'react-loader-spinner';
import css from "../Loader/Loader.module.css"

export const Loader = () => {
  return <div className={css.loader}>
    <Grid
      height="80"
      width="80"
      color="palevioletred"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
}
