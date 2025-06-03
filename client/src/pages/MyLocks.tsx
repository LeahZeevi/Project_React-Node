

import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Grid,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material"
import { Checkroom, Delete, Add, LocalLaundryService } from "@mui/icons-material"

// Types
interface Item {
  _id: string
  itemName: string
  categoryName: string
  image: string
  inUse: boolean
  inLaundryBasket: boolean
}

interface Look {
  _id: string
  name: string
  items: Item[]
}

// Mock data
const mockLooks: Look[] = [
  {
    _id: "1",
    name: "לוק עבודה קלאסי",
    items: [
      {
        _id: "1",
        itemName: "חולצה לבנה",
        categoryName: "חולצות",
        image: "/placeholder.svg?height=150&width=150",
        inUse: false,
        inLaundryBasket: false,
      },
      {
        _id: "2",
        itemName: "מכנסי חליפה שחורים",
        categoryName: "מכנסים",
        image: "/placeholder.svg?height=150&width=150",
        inUse: true,
        inLaundryBasket: false,
      },
      {
        _id: "3",
        itemName: "נעלי עקב שחורות",
        categoryName: "נעלים",
        image: "/placeholder.svg?height=150&width=150",
        inUse: false,
        inLaundryBasket: true,
      },
    ],
  },
  {
    _id: "2",
    name: "לוק קז'ואל סוף שבוע",
    items: [
      {
        _id: "4",
        itemName: "חולצת טי שירט",
        categoryName: "חולצות",
        image: "/placeholder.svg?height=150&width=150",
        inUse: false,
        inLaundryBasket: false,
      },
      {
        _id: "5",
        itemName: "ג'ינס כחול",
        categoryName: "מכנסים",
        image: "/placeholder.svg?height=150&width=150",
        inUse: false,
        inLaundryBasket: false,
      },
      {
        _id: "6",
        itemName: "סניקרס לבנות",
        categoryName: "נעלים",
        image: "/placeholder.svg?height=150&width=150",
        inUse: false,
        inLaundryBasket: false,
      },
    ],
  },
  {
    _id: "3",
    name: "לוק ערב אלגנטי",
    items: [
      {
        _id: "7",
        itemName: "שמלה שחורה",
        categoryName: "שמלות",
        image: "/placeholder.svg?height=150&width=150",
        inUse: false,
        inLaundryBasket: false,
      },
      {
        _id: "8",
        itemName: "נעלי עקב זהב",
        categoryName: "נעלים",
        image: "/placeholder.svg?height=150&width=150",
        inUse: false,
        inLaundryBasket: false,
      },
    ],
  },
]

const MyLooks = () => {
  const [looks, setLooks] = useState<Look[]>(mockLooks)
  const [openDialog, setOpenDialog] = useState(false)
  const [newLookName, setNewLookName] = useState("")

  const handleDeleteLook = (lookId: string) => {
    setLooks((prev) => prev.filter((look) => look._id !== lookId))
  }

  const handleSendToLaundry = (itemId: string, lookId: string) => {
    setLooks((prev) =>
      prev.map((look) =>
        look._id === lookId
          ? {
              ...look,
              items: look.items.map((item) =>
                item._id === itemId ? { ...item, inLaundryBasket: true, inUse: false } : item,
              ),
            }
          : look,
      ),
    )
  }

  const getItemStatusColor = (item: Item) => {
    if (item.inUse) return "#10b981"
    if (item.inLaundryBasket) return "#f59e0b"
    return "transparent"
  }

  const getItemStatusText = (item: Item) => {
    if (item.inUse) return "בלבישה"
    if (item.inLaundryBasket) return "בכביסה"
    return ""
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: 3,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.05"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.05"/><circle cx="50" cy="10" r="0.5" fill="%23ffffff" opacity="0.03"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\')',
          pointerEvents: "none",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
     
      </Box>

      {/* Looks List */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, position: "relative", zIndex: 1 }}>
        {looks.map((look, index) => (
          <Card
            key={look._id}
            sx={{
              borderRadius: "24px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              transform: `translateY(${index * 2}px)`,
              "&:hover": {
                transform: "translateY(-8px) scale(1.02)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
              },
            }}
          >
            {/* Look Header */}
            <Box
              sx={{
                p: 3,
                background: `linear-gradient(135deg, 
                  ${index % 3 === 0 ? "#ff6b6b, #feca57" : index % 3 === 1 ? "#48cae4, #023e8a" : "#f72585, #b5179e"})`,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                  animation: "shimmer 3s infinite",
                },
                "@keyframes shimmer": {
                  "0%": { transform: "translateX(-100%)" },
                  "100%": { transform: "translateX(100%)" },
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", zIndex: 1 }}>
                <Box
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "12px",
                    p: 1,
                    mr: 2,
                  }}
                >
                  <Checkroom sx={{ fontSize: 20 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "700",
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {look.name}
                </Typography>
              </Box>
              <IconButton
                onClick={() => handleDeleteLook(look._id)}
                sx={{
                  color: "white",
                  background: "rgba(255,255,255,0.2)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.3)",
                    transform: "scale(1.1)",
                  },
                  zIndex: 1,
                }}
              >
                <Delete />
              </IconButton>
            </Box>

            {/* Items Grid */}
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={2}>
                {look.items.map((item, itemIndex) => (
                  <Grid item xs={6} sm={4} md={3} key={item._id}>
                    <Card
                      sx={{
                        position: "relative",
                        borderRadius: "16px",
                        overflow: "hidden",
                        background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        transform: `translateY(${itemIndex * 2}px)`,
                        "&:hover": {
                          transform: "translateY(-4px) scale(1.05)",
                          boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: getItemStatusColor(item),
                          opacity: item.inUse || item.inLaundryBasket ? 0.1 : 0,
                          transition: "opacity 0.3s ease",
                        },
                      }}
                    >
                      {/* Status Badge */}
                      {(item.inUse || item.inLaundryBasket) && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            zIndex: 3,
                            background: `linear-gradient(45deg, ${getItemStatusColor(item)}, ${getItemStatusColor(item)}dd)`,
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "12px",
                            fontSize: "0.7rem",
                            fontWeight: "700",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          {getItemStatusText(item)}
                        </Box>
                      )}

                      <Box
                        sx={{
                          height: 140,
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          },
                          "&:hover::before": {
                            opacity: 1,
                          },
                        }}
                      >
                        {/* Overlay for worn items */}
                        {(item.inUse || item.inLaundryBasket) && (
                          <Box
                            sx={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(0,0,0,0.6)",
                              backdropFilter: "blur(2px)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              opacity: 0,
                              transition: "opacity 0.3s ease",
                              "&:hover": { opacity: 1 },
                            }}
                          >
                            {item.inUse && !item.inLaundryBasket && (
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<LocalLaundryService />}
                                onClick={() => handleSendToLaundry(item._id, look._id)}
                                sx={{
                                  background: "linear-gradient(45deg, #ff6b6b, #feca57)",
                                  borderRadius: "12px",
                                  fontWeight: "700",
                                  fontSize: "0.7rem",
                                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                                  "&:hover": {
                                    background: "linear-gradient(45deg, #ff5252, #ffb74d)",
                                    transform: "scale(1.05)",
                                  },
                                }}
                              >
                                לכביסה
                              </Button>
                            )}
                          </Box>
                        )}
                      </Box>

                      <CardContent
                        sx={{
                          p: 2,
                          background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "700",
                            mb: 0.5,
                            color: "#2d3748",
                            letterSpacing: "-0.2px",
                          }}
                        >
                          {item.itemName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#718096",
                            fontWeight: "500",
                          }}
                        >
                          {item.categoryName}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Add Look FAB */}
      <Fab
        size="large"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "linear-gradient(45deg, #ff6b6b, #feca57)",
          color: "white",
          boxShadow: "0 8px 25px rgba(255, 107, 107, 0.4)",
          "&:hover": {
            background: "linear-gradient(45deg, #ff5252, #ffb74d)",
            transform: "scale(1.1) rotate(90deg)",
            boxShadow: "0 12px 35px rgba(255, 107, 107, 0.6)",
          },
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
        onClick={() => setOpenDialog(true)}
      >
        <Add sx={{ fontSize: 28 }} />
      </Fab>

      {/* Add Look Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.3)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "700",
            color: "#2d3748",
            fontSize: "1.5rem",
          }}
        >
          ✨ יצירת לוק חדש
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="שם הלוק"
            fullWidth
            variant="outlined"
            value={newLookName}
            onChange={(e) => setNewLookName(e.target.value)}
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "&:hover fieldset": {
                  borderColor: "#ff6b6b",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff6b6b",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              borderRadius: "12px",
              fontWeight: "600",
              color: "#718096",
            }}
          >
            ביטול
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialog(false)
              setNewLookName("")
            }}
            sx={{
              borderRadius: "12px",
              background: "linear-gradient(45deg, #ff6b6b, #feca57)",
              fontWeight: "700",
              "&:hover": {
                background: "linear-gradient(45deg, #ff5252, #ffb74d)",
              },
            }}
          >
            יצירה
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default MyLooks

