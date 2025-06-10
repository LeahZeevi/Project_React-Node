import { useDispatch, useSelector } from "react-redux";
import Item from "../interfaces/Items";
import { useUpdateItemInUseMutation } from "../redux/api/apiSllices/itemsApiSlice";
import { selectAllLooks, setAllLooks, setItemsInUse, updateAllItems } from "../redux/slices/itemSlice";
import { Users } from "../interfaces/Users";
import { selectUser } from "../redux/slices/userSlice";
import { useGetAllLooksQuery} from "../redux/api/apiSllices/looksApiSlice";
import { Looks } from "../interfaces/Looks";
import { useEffect } from "react";

const useUpdateItem = () => {
    const [updateItemInUse] = useUpdateItemInUseMutation();
    const dispatch = useDispatch()
    const user: Users = useSelector(selectUser);

    const allLooks: Looks[] = useSelector(selectAllLooks)
    const { data, error, isLoading } = useGetAllLooksQuery(user._id)
    const fetchWardrobe = async () => {
        if (allLooks.length === 0) {
            try {
                const looks: Looks[] = data ? data.allLooks : [];
                dispatch(setAllLooks(looks));
            } catch (err) {
                console.error('שגיאה בקבלת פריטים:', err);
            }
        }
    };

    useEffect(() => {
        fetchWardrobe();

    }, [data]);



    const updateItem = async (item: Item, inUse: boolean) => {
        try {
            const { inUseItems, updatedItem } = await updateItemInUse({
                _id: item._id,
                inUse,
                userId: user._id,
            }).unwrap();

            dispatch(setItemsInUse(inUseItems));

            if (inUse === false) {

                const updateItems = [...inUseItems, updatedItem];
                dispatch(updateAllItems(updateItems));
            } else {
                dispatch(updateAllItems(inUseItems));
            }
        } catch (err) {
            console.error("שגיאה בעדכון לבישה:", err);
        }
    };

    return { updateItem };
}
export default useUpdateItem;