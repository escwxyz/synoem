import Table from "./Table.astro";
import TableBody from "./TableBody.astro";
import TableCell from "./TableCell.astro";
import TableHead from "./TableHead.astro";
import TableHeader from "./TableHeader.astro";
import TableRow from "./TableRow.astro";
import TableCaption from "./TableCaption.astro";
import TableFooter from "./TableFooter.astro";

export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
  TableFooter,
};

export default {
  Root: Table,
  Body: TableBody,
  Cell: TableCell,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow,
  Caption: TableCaption,
};
