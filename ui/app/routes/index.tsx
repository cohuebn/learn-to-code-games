import { useState } from "react";
import {
  Celebration,
  Clear,
  Leaderboard,
  PlayArrow,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import range from "just-range";
import learningDolphin from "~/images/learning-dolphin.png";

export default function Index() {
  const numbers = range(1, 6);
  const componentSize = numbers.length > 8 ? "md" : "sm";
  const [name, setName] = useState("");
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  type PlayerResults = {
    name: string;
    wins: number;
    gamesPlayed: number;
  };
  const [leaderboard, setLeaderboard] = useState<Record<string, PlayerResults>>(
    {}
  );
  type LastGameResult = {
    playerName: string;
    pickedNumber: number;
    actualNumber: number;
    wonGame: boolean;
  };
  const [lastGameResult, setLastGameResult] = useState<LastGameResult | null>(
    null
  );

  function getRandomInt(): number {
    const min = numbers[0];
    const max = numbers[numbers.length - 1];
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
    const updatedLeaderboard = {
      ...leaderboard,
      [playerName]: updatedPlayerEntry,
    };
    console.info(updatedLeaderboard);
    setLeaderboard(updatedLeaderboard);
  }

  function renderLastGameResult() {
    if (!lastGameResult) {
      return (
        <Typography variant="body1">No games have been played yet</Typography>
      );
    }
    const gameText = `${lastGameResult.playerName} picked ${lastGameResult.pickedNumber} and the answer was ${lastGameResult.actualNumber}.`;
    const gameIcon = lastGameResult?.wonGame ? (
      <Celebration sx={{ verticalAlign: "text-bottom", marginRight: 1 }} />
    ) : (
      <Clear sx={{ verticalAlign: "text-bottom", marginRight: 1 }} />
    );
    return (
      <Typography variant="body1">
        {gameIcon} {gameText}
      </Typography>
    );
  }

  function renderLeaderboard() {
    if (!Object.keys(leaderboard).length) {
      return <Typography variant="body1">No games played yet</Typography>;
    }

    const sortedLeaderboard = [...Object.values(leaderboard)].sort(
      (a, b) => b.wins - a.wins
    );
    return (
      <Table>
        <TableHead>
          <TableCell>Player</TableCell>
          <TableCell align="right">Wins</TableCell>
          <TableCell align="right">Games played</TableCell>
          <TableCell align="right">Win %</TableCell>
        </TableHead>
        <TableBody>
          {sortedLeaderboard.map((playerResults) => {
            return (
              <TableRow key={playerResults.name}>
                <TableCell>{playerResults.name}</TableCell>
                <TableCell align="right">{playerResults.wins}</TableCell>
                <TableCell align="right">{playerResults.gamesPlayed}</TableCell>
                <TableCell align="right">
                  {Math.floor(
                    (playerResults.wins / playerResults.gamesPlayed) * 100
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  // 1. Figure out how to get a random number and see if the player picked that number
  //    HINT: I made a helper function called getRandomInt
  // 2. Update the leaderboard based on the result of the game
  //    HINT: I made a helper function called updateLeaderboard
  // 3. Set the last game result so the player knows if they won or not
  //    HINT: I made a helper function called setLastGameResult
  function playGame(playerName: string, pickedNumber: number) {
    const winningNumber = getRandomInt();
    console.info(winningNumber);
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
              onClick={(_) => playGame(name, selectedNumber as number)}
            >
              <PlayArrow /> Play
            </Button>
          </ButtonGroup>
          <Divider />
          <Typography variant="h6">Last game result</Typography>
          {renderLastGameResult()}
          <Divider />
          <Typography variant="h6">
            <Leaderboard
              sx={{ verticalAlign: "text-bottom", marginRight: 1 }}
            />
            Leaderboard
          </Typography>
          {renderLeaderboard()}
        </Stack>
      </Container>
    </Box>
  );
}
