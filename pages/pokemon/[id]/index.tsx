import {
  AppBar,
  Box,
  Chip,
  Paper,
  Tab,
  Tabs,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { usePokemonData } from "../../../hooks/FeedProvider/usePokemonData";
import useFormatString from "../../../hooks/FormatString/useFormatString";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      overflow="auto"
      maxHeight={300}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function PokemonPage() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const { pokemon } = usePokemonData();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log(pokemon);
  const name = !!pokemon?.name ? useFormatString(pokemon?.name) : "";
  const image = !!pokemon?.officialImage ? (
    <Image
      src={pokemon.officialImage}
      alt={name}
      width={350}
      height={350}
      priority
    />
  ) : (
    ""
  );

  const moves = !!pokemon?.moves
    ? pokemon?.moves.map((move, index) => {
        return (
          <Chip
            key={index}
            label={useFormatString(move)}
            sx={{ margin: 0.5 }}
            variant="outlined"
          />
        );
      })
    : undefined;

  const stats = !!pokemon?.stats
    ? pokemon?.stats.map((stat, index) => {
        return (
          <Box
            key={index}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="inherit">
              {useFormatString(stat[0])}
            </Typography>
            <Typography variant="inherit">{stat[1]}</Typography>
          </Box>
        );
      })
    : "";

  const types = !!pokemon?.typeName
    ? pokemon?.typeName.map((type, index) => {
        return (
          <Box key={index}>
            <Typography variant="inherit">{useFormatString(type)}</Typography>
          </Box>
        );
      })
    : "";

  const abilities = !!pokemon?.abilities
    ? pokemon?.abilities.map((ability, index) => {
        const hidden = ability[1] ? "Hidden" : "Not Hidden";
        return (
          <Box
            key={index}
            sx={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Typography variant="inherit">
              {useFormatString(ability[0])}
            </Typography>
            {hidden}
          </Box>
        );
      })
    : "";

  const pokemonCard = (
    <Item sx={{ display: "flex", justifyContent: "space-evenly" }}>
      <Box sx={{ maxWidth: 500 }}>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h5">#{pokemon?.id}</Typography>
        {image}
      </Box>
      <Box sx={{ bgcolor: "background.paper", width: 500 }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="About" {...a11yProps(0)} />
            <Tab label="Stats" {...a11yProps(1)} />
            <Tab label="Moves" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <Box
          sx={{
            display: "grid",
            alignContent: "space-between",
            minHeight: 350,
          }}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {types}
            <Typography variant="inherit">{pokemon?.height}</Typography>
            <Typography variant="inherit">{pokemon?.weight}</Typography>
            {abilities}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {stats}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {moves}
          </TabPanel>
          <Box sx={{ mt: 4 }}>Evolutions </Box>
        </Box>
      </Box>
    </Item>
  );

  return <Box sx={{ flexGrow: 1, marginTop: 10 }}>{pokemonCard}</Box>;
}
