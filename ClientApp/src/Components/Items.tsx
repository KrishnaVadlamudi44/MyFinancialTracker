import React, { useEffect, useState } from 'react';
import { GetUserItems } from '../Api/UserApi';
import { IUserItems } from '../Models/UserModels/User';

const Items = () => {
  const [userItems, setuserItems] = useState<IUserItems[]>();

  const LoadUserItems = async () => {
    let items = await GetUserItems();
    setuserItems(items);
  };

  const RemoveItem = async () => {};

  useEffect(() => {
    LoadUserItems();
  }, []);
  return (
    <div>
      {userItems &&
        userItems.length > 0 &&
        userItems.map((item) => {
          return (
            <div key={item.institutionId}>
              <p>
                {item.institutionId} - {item.institutionName}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default Items;
