
import { use, useEffect, useState } from "react"
import {Box,Card,Typography,IconButton, Button,Dialog,DialogTitle,DialogContent,DialogActions,
    TextField,Chip,Avatar,Collapse,Divider,Tooltip,Alert,} from "@mui/material"
import {Delete,ExpandMore,ExpandLess,Edit,} from "@mui/icons-material"
import { Looks } from "../interfaces/Looks"
import Item from "../interfaces/Items"
import { Users } from "../interfaces/Users"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../redux/slices/userSlice"
import { useAddLookMutation, useDeleteLookMutation, useGetAllLooksQuery, useUpdateNameOfLookMutation } from "../redux/api/apiSllices/looksApiSlice"
import { selectAllLooks, setAllLooks, updateAllLooks } from "../redux/slices/itemSlice"



const MyLooksPage = () => {
    const user: Users = useSelector(selectUser);
    const looks:Looks[]= useSelector(selectAllLooks);
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [editLookId, setEditLookId] = useState<string | null>(null)
    const [editLookName, setEditLookName] = useState("")
    const [expandedLook, setExpandedLook] = useState<string | null>(null)
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const dispatch = useDispatch();
    const [deleteLook] = useDeleteLookMutation();
    const [updateLook] = useUpdateNameOfLookMutation()
    const { data, error, isLoading } = useGetAllLooksQuery(user._id, {
        skip: !user._id,
    });

    const handleDeleteLook = async (lookId: string) => {

        try {
            await deleteLook(lookId).unwrap();
            looks.filter(look=>look._id!==lookId)
            dispatch(updateAllLooks(looks));
        } catch (err: any) {
            if (err.status === 404) {
                setMessage(err.data.message)
            }
            if (err.status === 500) {
                setMessage("Unable to delete at this time, please try again later.")
            }
            setIsAlert(true)
        }
    }


    const handleEditLook = (lookId: string) => {
        const look = looks.find((l) => l._id === lookId)
        if (look) {
            setEditLookId(lookId)
            setEditLookName(look.nameLook || "")
            setOpenEditDialog(true)
        }
    }

    const handleSaveEditLook = () => {
        if (editLookId) {
            updateLook({ _id: editLookId, nameLook: editLookName })
                .unwrap()
                .then(() => {
                    const updatedLooks = looks.map((look: Looks) =>
                        look._id === editLookId
                            ? {
                                ...look,
                                nameLook: editLookName,
                            }
                            : look,
                    );
                    dispatch(setAllLooks(updatedLooks));
                    setOpenEditDialog(false);
                    setEditLookId(null);
                    setEditLookName("");
                })
                .catch((err) => {
                    console.error("שגיאה בעדכון לוק:", err);
                });
        }
    };

    const toggleExpandLook = (lookId: string) => {
        setExpandedLook(expandedLook === lookId ? null : lookId)
    }


    const getItemStatusText = (item: Item) => {
        if (item.inUse) return "בלבישה"
        if (item.inLaundryBasket) return "בכביסה"
        return "זמין"
    }

    useEffect(() => {
        
    }, [data]);

    const fetchWardrobe = async () => {
        if (looks.length === 0) {
            try {
                const looks:Looks[] = data?.allLooks ? data.allLooks : [];
                dispatch(setAllLooks(looks));
            } catch (err) {
                console.error('שגיאה בקבלת פריטים:', err);
            }
        }
    };

    useEffect(() => {
        fetchWardrobe();
    }, [data]);

    useEffect(() => {
    }, [looks]);

    return (

        <Box
            sx={{
                minHeight: "100vh",
                padding: 3,
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {looks.map((look, index) => (
                    <Card
                        key={look._id}
                        sx={{
                            borderRadius: "16px",
                            overflow: "hidden",
                            background: "white",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            border: "1px solid #f1f5f9",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                            },
                        }}
                    >
                        {/* Look Header - Only colored part */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                p: 2.5,
                                background: "linear-gradient(135deg, rgb(187, 2, 156) 0%, rgb(101, 120, 227) 100%)",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: "700",
                                        color: "white",
                                        textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    {look.nameLook || `לוק ${index + 1}`}
                                </Typography>
                                <Chip
                                    label={`${look.itemsInlook.length} פריטים`}
                                    size="small"
                                    sx={{
                                        ml: 2,
                                        height: 24,
                                        fontWeight: "600",
                                        fontSize: "0.7rem",
                                        background: "rgba(255,255,255,0.2)",
                                        color: "white",
                                        borderRadius: "8px",
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: 0.5 }}>
                                <Tooltip title="ערוך שם">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleEditLook(look._id)}
                                        sx={{
                                            color: "white",
                                            background: "rgba(255,255,255,0.2)",
                                            "&:hover": { background: "rgba(255,255,255,0.3)" },
                                            width: 32,
                                            height: 32,
                                        }}
                                    >
                                        <Edit fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={expandedLook === look._id ? "סגור" : "פתח"}>
                                    <IconButton
                                        size="small"
                                        onClick={() => toggleExpandLook(look._id)}
                                        sx={{
                                            color: "white",
                                            background: "rgba(255,255,255,0.2)",
                                            "&:hover": { background: "rgba(255,255,255,0.3)" },
                                            width: 32,
                                            height: 32,
                                        }}
                                    >
                                        {expandedLook === look._id ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="מחק">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDeleteLook(look._id)}
                                        sx={{
                                            color: "white",
                                            background: "rgba(255,255,255,0.2)",
                                            "&:hover": { background: "rgba(255,255,255,0.3)" },
                                            width: 32,
                                            height: 32,
                                        }}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>

                        {/* Look Content - White background */}
                        <Box sx={{ p: 3, background: "white" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    overflowX: "auto",
                                    gap: 2,
                                    pb: 1,
                                    "&::-webkit-scrollbar": {
                                        height: 6,
                                    },
                                    "&::-webkit-scrollbar-track": {
                                        background: "#f1f5f9",
                                        borderRadius: 3,
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        background: "#cbd5e1",
                                        borderRadius: 3,
                                    },
                                }}
                            >
                                {look.itemsInlook.map((item) => (
                                    <Box
                                        key={item._id}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            minWidth: "auto",
                                            background: "#f8fafc",
                                            borderRadius: "12px",
                                            border: `2px solid ${item.inUse ? "#10b981" : item.inLaundryBasket ? "#f59e0b" : "#e2e8f0"}`,
                                            overflow: "hidden",
                                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                            "&:hover": {
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "relative",
                                                width: 70,
                                                height: 70,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    backgroundImage: `url(http://localhost:3000/${item.image.replace(/^public[\\/]/, '')} )`,


                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                }}
                                            />
                                        </Box>
                                        <Box sx={{ p: 1.5, px: 2 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: "600",
                                                    color: "#1e293b",
                                                    whiteSpace: "nowrap",
                                                    mb: 0.5,
                                                }}
                                            >
                                                {item.itemName}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: "#64748b",
                                                    display: "block",
                                                }}
                                            >
                                                {item.categoryName}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {/* Expanded Content - White background */}
                        <Collapse in={expandedLook === look._id}>
                            <Divider sx={{ borderColor: "#f1f5f9" }} />
                            <Box sx={{ p: 3, background: "white" }}>
                                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: "600", color: "#475569" }}>
                                    פרטי הלוק
                                </Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                                    {look.itemsInlook.map((item) => (
                                        <Chip
                                            key={item._id}
                                            avatar={
                                                <Avatar
                                                    src={item.image ? `http://localhost:3000/${item.image.replace(/^public[\\/]/, '')}` : 'path/to/default/image.jpg'}
                                                    sx={{
                                                        border: `2px solid ${item.inUse ? "#10b981" : item.inLaundryBasket ? "#f59e0b" : "#e2e8f0"
                                                            }`,
                                                    }}
                                                />
                                            }
                                            label={`${item.itemName} (${getItemStatusText(item)})`}
                                            variant="outlined"
                                            sx={{
                                                borderColor: "#e2e8f0",
                                                "& .MuiChip-label": {
                                                    color: "#475569",
                                                },
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Collapse>
                    </Card>
                ))}
            </Box>

            <Dialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: "16px",
                        overflow: "hidden",
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        background: "linear-gradient(135deg, rgb(187, 2, 156) 0%, rgb(101, 120, 227) 100%)",
                        color: "white",
                        fontWeight: "700",
                    }}
                >
                    עריכת שם הלוק
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 1 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="שם הלוק"
                        fullWidth
                        variant="outlined"
                        value={editLookName}
                        onChange={(e) => setEditLookName(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2, px: 3 }}>
                    <Button
                        onClick={() => setOpenEditDialog(false)}
                        sx={{
                            color: "#64748b",
                            fontWeight: "600",
                        }}
                    >
                        ביטול
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSaveEditLook}
                        sx={{
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, rgb(187, 2, 156) 0%, rgb(101, 120, 227) 100%)",
                            fontWeight: "600",
                            "&:hover": {
                                background: "linear-gradient(135deg, rgb(167, 2, 136) 0%, rgb(81, 100, 207) 100%)",
                            },
                        }}
                    >
                        שמירה
                    </Button>
                </DialogActions>
            </Dialog>
            {isAlert && (<Box sx={{ position: "fixed", bottom: 16, left: 16, zIndex: 9999, }}>
                <Alert severity="error">{message}</Alert>
            </Box>)}
        </Box>
    )
}

export default MyLooksPage