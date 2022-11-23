import { useState } from "react";
import { Leaderboard, PlayArrow } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import learningDolphin from "~/images/learning-dolphin.png";

export default function Index() {
  const numbers = [1, 2, 3];
  const componentSize = numbers.length > 8 ? "md" : "sm";
  const [name, setName] = useState("");
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [lastGameResult, setLastGameResult] = useState<string | null>(null);
  type PlayerResults = {
    name: string;
    wins: number;
    gamesPlayed: number;
  };
  const [leaderboard, setLeaderboard] = useState<Record<string, PlayerResults>>(
    {}
  );

  function getRandomInt(min: number, max: number): number {
    const randomMin = Math.ceil(min);
    return Math.floor(
      Math.random() * (Math.floor(max) - randomMin + 1) + randomMin
    );
  }

  function updateLeaderboard(playerName: string, wonGame: boolean) {
    const currentPlayerEntry = leaderboard[playerName];
    const winIncrement = wonGame ? 1 : 0;
    const updatedPlayerEntry: PlayerResults = currentPlayerEntry
      ? {
          ...currentPlayerEntry,
          gamesPlayed: currentPlayerEntry.gamesPlayed + 1,
          wins: currentPlayerEntry.wins + winIncrement,
        }
      : { name: playerName, gamesPlayed: 1, wins: winIncrement };
    const updateLeaderboard = {
      ...leaderboard,
      playerName: updatedPlayerEntry,
    };
    setLeaderboard(updateLeaderboard);
  }

  function playGame(playerName: string, pickedNumber: number) {
    console.info(`Playing game with ${playerName} who picked ${pickedNumber}`);
  }

  function getLeaderboardElement() {
    return leaderboard.length ? (
      <List>
        {leaderboard.map((leaderboardPartipant) => {
          return (
            <ListItem key={leaderboardPartipant.name}>
              <ListItemAvatar>
                <Avatar alt={leaderboardPartipant.name}>
                  {leaderboardPartipant.name.substring(0, 1)}
                </Avatar>
                <ListItemText>{leaderboardPartipant.name}</ListItemText>
              </ListItemAvatar>
            </ListItem>
          );
        })}
      </List>
    ) : (
      <Typography variant="body1">No games played yet</Typography>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src={learningDolphin} height={40} width={40} alt="logo" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Learn to code
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth={componentSize}>
        <Stack spacing={2} marginTop={2}>
          <TextField
            id="name"
            label="What is your name?"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              {`Pick a number between ${numbers[0]} and ${
                numbers[numbers.length - 1]
              }`}
            </FormLabel>
            <RadioGroup
              row
              name="number"
              value={selectedNumber}
              onChange={(e) => setSelectedNumber(parseInt(e.target.value, 10))}
            >
              {numbers.map((number) => {
                return (
                  <FormControlLabel
                    value={number}
                    control={<Radio />}
                    label={number}
                    key={number}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
          <ButtonGroup>
            <Button
              variant="contained"
              disabled={!name || !selectedNumber}
              onClick={(e) => playGame(name, selectedNumber as number)}
            >
              <PlayArrow /> Play
            </Button>
          </ButtonGroup>
          <Divider />
          <Typography variant="h6">
            <Leaderboard
              sx={{ verticalAlign: "text-bottom", marginRight: 1 }}
            />
            Leaderboard
          </Typography>
          {getLeaderboardElement()}
        </Stack>
      </Container>
    </Box>
  );
}
