import { useEffect } from 'react';
import Item from '../interfaces/Items';
import CurrentWorn from '../components/CurrentWorn';
import '../css/try.css'
import { useGetAllItemsQuery } from '../redux/api/apiSllices/itemsApiSlice';
import { Users } from '../interfaces/Users';
import { selectUser } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import CountUp from '../components/CountUp';
import { selectAllItems, setAllItems } from '../redux/slices/itemSlice';
import { useDispatch } from 'react-redux';
import ErrorPage from './ErrorPage';
import ShirtHangerLoader from '../components/ShirtHangerLoader';

//Displays numerical data about the wardrobe
const HomePage = () => {
    const user: Users = useSelector(selectUser);
    const myWardrobe = useSelector(selectAllItems);
    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetAllItemsQuery(user._id);

    //Reorganizing the items in the wardrobe
    const fetchWardrobe = async () => {
        if (myWardrobe.length === 0) {
            const items = data ? data : [];
            dispatch(setAllItems(items));
        }
    };

    useEffect(() => {
        fetchWardrobe();
    }, [data]);

    //The clothes in use
    const wornItems = myWardrobe.filter(item => item.inUse);

    return (
        <>
            {isLoading ? (
                <ShirtHangerLoader />
            ) : error ? (
                <ErrorPage errorMessage="There is a problem loading the site. Please try again later." />
            ) : (
                <div className="page-content">

                    {/* Shows the details of the clothing */}
                    <CurrentWorn />

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-number">
                                <CountUp target={myWardrobe.length} duration={900} />
                            </div>
                            <div className="stat-label">פריטים בארון</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">1</div>
                            <div className="stat-label">לוקים שמורים</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">
                                <CountUp target={wornItems.length} duration={200} />
                            </div>
                            <div className="stat-label">בלבישה</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

};

export default HomePage;