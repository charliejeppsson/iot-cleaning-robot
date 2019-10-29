const lodash = require('lodash');
const db = require('../../../db/models');

async function cleanOffice(req, res) {
  const start = process.hrtime();
  const commands = req.body.commands;
  let cleanedPositions = [{ x: req.body.start.x, y: req.body.start.y }];
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
      return { x: currentPosition.x + 1, y: currentPosition.y };
      break;
    case 'west':
      return { x: currentPosition.x - 1, y: currentPosition.y };
      break;
    case 'north':
      return { x: currentPosition.x, y: currentPosition.y + 1 };
      break;
    case 'south':
      return { x: currentPosition.x, y: currentPosition.y - 1 };
      break;
    default:
      return currentPosition;
  }
}

function countUniqueCleanPositions(cleanedPositions) {
  const uniqueArr = lodash.uniqWith(cleanedPositions, lodash.isEqual);
  return uniqueArr.length;
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
