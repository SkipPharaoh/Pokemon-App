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
        <Item>
          <Image src={image[0]} alt={name} width={300} height={300} priority />
          <Button size="large" onClick={handleOnClick}>
            <Link href="/pokemon">
              <Typography variant="h4">{name}</Typography>
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
      >
        {regionName}
      </Grid>
    </Box>
  );
}
