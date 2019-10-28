const db = require('../../../db/models');

async function cleanOffice(req, res) {
  const start = process.hrtime();
  const commands = req.body.commands;
  let cleanedPositions = [[req.body.start.x, req.body.start.y]];
  for (let i = 0; i < commands.length; i++) {
    cleanedPositions = collectCleanedPositions(commands, cleanedPositions, i);
  }
  const cleanCount = countUniqueCleanPositions(cleanedPositions);
  const duration = calcDuration(start);
  const newExecution = await createExecution(commands, cleanCount, duration);
  res.send(newExecution);
}

function collectCleanedPositions(commands, cleanedPositions, i) {
  let currentCommand = commands[i];
  let currentPosition; 
  for (let j = 1; j <= currentCommand.steps; j++) {
    currentPosition = cleanedPositions[cleanedPositions.length - 1];
    let nextPosition = incrementPosition(currentCommand, currentPosition, j);
    cleanedPositions.push(nextPosition);
  }
  return cleanedPositions;
}

function incrementPosition(currentCommand, currentPosition, j) {
  switch (currentCommand.direction) {
    case 'east':
      return [currentPosition[0] + j, currentPosition[1]];
      break;
    case 'west':
      return [currentPosition[0] - j, currentPosition[1]];
      break;
    case 'north':
      return [currentPosition[0], currentPosition[1] + j];
      break;
    case 'south':
      return [currentPosition[0], currentPosition[1] - j];
      break;
    default:
      return currentPosition;
  }
}

function countUniqueCleanPositions(cleanedPositions) {
  const uniqueSet = new Set(cleanedPositions);
  return uniqueSet.size
}

function calcDuration(start) {
  const end = process.hrtime(start);
  const nanoDuration = end[1];
  return nanoDuration / 1000000;
}

async function createExecution(commands, cleanCount, duration) {
  try {
    const { dataValues } = await db.Executions.create({
      commands: commands.length,
      result: cleanCount,
      duration
    });
    return {
      id: dataValues.id,
      timestamp: dataValues.createdAt,
      commands: dataValues.commands,
      result: dataValues.result,
      duration: dataValues.duration
    };
  } catch(err) {
    console.log(err);
    return {};
  }
}

module.exports = { cleanOffice };
