
export interface Expense{
  title: string;
  date: string;
  expenseList: [
    {
      expense: string;
      price: number;
    }
  ];
}