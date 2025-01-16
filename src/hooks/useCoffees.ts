import { useState, useEffect } from 'react';

const useCoffees = () => {
  const [coffees, setCoffees] = useState([]);
  const [beans, setBeans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffeesAndBeans = async () => {
      try {
        const coffeeResponse = await fetch('https://coffeewoltbackend-production.up.railway.app/api/coffee');
        if (!coffeeResponse.ok) {
          throw new Error('Failed to fetch coffees');
        }
        const coffeeData = await coffeeResponse.json();
        setCoffees(coffeeData);
        const beanResponse = await fetch('https://coffeewoltbackend-production.up.railway.app/api/beans');
        if (!beanResponse.ok) {
          throw new Error('Failed to fetch beans');
        }
        const beanData = await beanResponse.json();
        setBeans(beanData);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeesAndBeans();
  }, []); 

  return {
    coffees,
    beans,
    loading,
    error,
  };
};

export default useCoffees;