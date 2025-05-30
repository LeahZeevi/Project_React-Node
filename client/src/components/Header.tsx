"use client"

import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import { Drawer, Box, Typography, IconButton, Card, CardMedia, Fade, Zoom, Chip } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { useGetAllItemsQuery, useUpdateItemInLaundryBasketMutation } from "../redux/api/apiSllices/itemsApiSlice"
import type { Users } from "../interfaces/Users"
import { useSelector } from "react-redux"
import { selectUser } from "../redux/slices/userSlice"
import { selectItemInLaundry, setAllItems, setItemsInLaundry, updateAllItems } from "../redux/slices/itemSlice"
import { useDispatch } from "react-redux"
import "../css/LaundryBasket.css"

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [updateItemInLaundry] = useUpdateItemInLaundryBasketMutation()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const user: Users = useSelector(selectUser)
  const { data, error, isLoading } = useGetAllItemsQuery(user._id)
  const itemInLaundryBasket = useSelector(selectItemInLaundry)
  const dispatch = useDispatch()

  const handleUpdateItem = async (_id: string) => {
    try {
      const { itemsInLaundry, updatedItem } = await updateItemInLaundry({
        _id: _id,
        inLaundryBasket: false,
        userId: user._id,
      }).unwrap()
      const updateItems = [...itemsInLaundry, updatedItem]
      dispatch(setItemsInLaundry(itemsInLaundry))
      dispatch(updateAllItems(updateItems))
    } catch (error) {
      console.error("שגיאה בעדכון הפריט:", error)
    }
  }

  const closeBasket = () => {
    setIsSideNavOpen(false)
  }

  const allItemsInLaundry = async () => {
    setIsSideNavOpen(true)
    await fetchWardrobe()
  }

  const fetchWardrobe = async () => {
    if (itemInLaundryBasket.length === 0) {
      try {
        const allItems = data ? data : []
        dispatch(setAllItems(allItems))
      } catch (error) {
        console.error("שגיאה בקבלת פריטים:", error)
      }
    }
  }

  useEffect(() => {
    fetchWardrobe()
  }, [])

  return (
    <div className="app">
      <header className="header">
        <button className="menu-btn" onClick={() => setDrawerOpen(true)}>
          ☰
        </button>
        <h1>הארון הדיגיטלי שלי</h1>
        <IconButton
          onClick={allItemsInLaundry}
          className="basket-icon-btn"
          sx={{
            background: "linear-gradient(45deg, rgba(194, 18, 146, 0.85), rgba(99, 102, 241, 0.85))",
            color: "white",
            "&:hover": {
              background: "linear-gradient(45deg, rgba(194, 18, 146, 0.95), rgba(99, 102, 241, 0.95))",
              transform: "scale(1.05)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <LocalLaundryServiceIcon />
          {itemInLaundryBasket.length > 0 && (
            <Chip
              label={itemInLaundryBasket.length}
              size="small"
              sx={{
                position: "absolute",
                top: -5,
                right: -5,
                backgroundColor: "#ff4081",
                color: "white",
                fontSize: "0.7rem",
                height: "18px",
                minWidth: "18px",
              }}
            />
          )}
        </IconButton>
      </header>

      <nav className="drawer" style={{ right: `${drawerOpen ? "0" : "-300px"}` }}>
        <NavLink
          to="/"
          className={`menu-item ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => setDrawerOpen(false)}
        >
          <span className="menu-icon">🏠</span>
          בית
        </NavLink>
        <NavLink
          to="/myWardrobe"
          className={`menu-item ${location.pathname === "/wardrobe" ? "active" : ""}`}
          onClick={() => setDrawerOpen(false)}
        >
          <span className="menu-icon">👔</span>
          הארון שלי
        </NavLink>
      </nav>

      <Drawer
        anchor="left"
        open={isSideNavOpen}
        onClose={closeBasket}
        PaperProps={{
          sx: {
            width: 320,
            background: "linear-gradient(to bottom, rgba(194, 18, 146, 0.85), rgba(99, 102, 241, 0.85))",
            color: "white",
            borderRadius: "0 16px 16px 0",
            boxShadow: "4px 0 20px rgba(194, 18, 146, 0.2)",
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <Box
            sx={{
              p: 3,
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocalLaundryServiceIcon sx={{ fontSize: "2rem" }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  סל כביסה
                </Typography>
              </Box>
              <IconButton
                onClick={closeBasket}
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {itemInLaundryBasket.length} פריטים בסל
              </Typography>
              <Chip
                label={itemInLaundryBasket.length}
                size="small"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
            {itemInLaundryBasket?.length === 0 ? (
              <Fade in={true}>
                <Box
                  sx={{
                    textAlign: "center",
                    py: 6,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <LocalLaundryServiceIcon sx={{ fontSize: "4rem", opacity: 0.5 }} />
                  <Typography variant="h6" sx={{ opacity: 0.8 }}>
                    הסל ריק
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.6 }}>
                    הוסף פריטים לכביסה
                  </Typography>
                </Box>
              </Fade>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {itemInLaundryBasket?.map((item, index) => (
                  <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={item._id}>
                    <Card className="laundry-item-card-new">
                      <Box sx={{ position: "relative", p: 1 }}>
                        <CardMedia
                          component="img"
                          image={`http://localhost:3000/${item.image.replace(/^public[\\/]/, "")}`}
                          alt={item.itemName}
                        />
                        <IconButton
                          onClick={() => handleUpdateItem(item._id)}
                          className="remove-btn-new"
                          size="small"
                          sx={{
                            backgroundColor: "rgba(194, 18, 146, 0.8)",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "rgba(194, 18, 146, 0.9)",
                            },
                          }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Card>
                  </Zoom>
                ))}
              </Box>
            )}
          </Box>

          {/* Footer */}
          {itemInLaundryBasket.length > 0 && (
            <Box
              sx={{
                p: 2,
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
            </Box>
          )}
        </Box>
      </Drawer>
    </div>
  )
}

export default Header
