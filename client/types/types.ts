export interface IUser {
  id: number;
  email: string;
  token: string;
}

export interface IUserData {
  email: string;
  password: string;
}

interface IResponseUser {
  email: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  password: string;
}

export interface IResponseUserData {
  token: string;
  user: IResponseUser;
}

export interface ICategory {
  title: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  transactions: ITransaction[];
}

export interface ITransactionFormData {
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
}

export interface ITransaction extends Omit<ITransactionFormData, "category"> {
  category: ICategory;
  id: number;
  createdAt: string;
  updatedAt: string;
}
