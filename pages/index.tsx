import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePokemonData } from "../hooks/FeedProvider/usePokemonData";
import { regions } from "../pokemon-info/pokeInfo";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const { handleOnClick } = usePokemonData();

  const regionName = regions.map((region) => {
    const name = region.name;
    const image = region.image;
    return (
      <Grid item xs={2} sm={4} md={4} lg={5} xl={6} key={name}>
        <Item
          sx={{
            boxShadow: 23,
            position: "relative",
            minHeight: 300,
            "&:hover": {
              transition: "all .5s ease-in-out",
              transform: "translate(0, 1.5px) scale(1.05)",
            },
          }}
        >
          <Image src={image[0]} alt={name} fill priority />
          <Button size="small" onClick={handleOnClick}>
            <Link href="/pokemon">
              <Typography
                variant="h4"
                sx={{
                  color: "blue",
                  backgroundColor: "lightyellow",
                  position: "absolute",
                  borderRadius: 4,
                  textShadow: "5px 5px 4px #fff000",
                  top: 265,
                  left: -10,
                }}
              >
                {name}
              </Typography>
            </Link>
          </Button>
        </Item>
      </Grid>
    );
  });

  return (
    <Box sx={{ flexGrow: 1, marginTop: 10 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 4, xl: 5 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}
        sx={{ justifyContent: "center" }}
      >
        {regionName}
      </Grid>
    </Box>
  );
}
