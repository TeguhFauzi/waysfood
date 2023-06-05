import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { API } from '../api/Api';
import { UserContext } from '../context/UserContext';

const TransactionTable = () => {
  const [userState] = useContext(UserContext);
  const [transactionList, setTransactionList] = useState(null);

  const { data: Transactions, isLoading: TransactionsLoading } = useQuery('transactionsCached', async () => {
    const response = await API.get(`/transactions`);
    return response.data.data;
  });

  useEffect(() => {
    let transList = Transactions?.filter((trx) => trx.PartnerID === userState.user.id);
    setTransactionList(transList);
  }, [Transactions]);

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  return (
    <React.Fragment>
      <div className="px-36 pt-48 mx-auto container">
        <h2 className="text-3xl font-bold mb-3">Income Transactions</h2>
        <div className="relative overflow-x-auto font-sans">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black font-bold uppercase bg-yellow-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionList &&
                transactionList.map((trx) => (
                  <tr className="bg-white border-b text-black">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                      {new Date(trx.CreatedAt).toDateString()}
                    </th>
                    <td className="px-6 py-4">{trx.Status}</td>
                    <td className="px-6 py-4">{rupiah(trx.TotalPrice)}</td>
                    <td className="px-6 py-4">{trx.Customer.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TransactionTable;
