function createWebTaskDefinition(accountID, region, tag, family, revision) {
  const taskDefinition = {
    containerDefinitions: [
      {
        name: 'web-service-review',
        image: `${accountID}.dkr.ecr.${region}.amazonaws.com\/microservicemovies\/web-service-review:${tag}`,
        essential: true,
        memoryReservation: 300,
        cpu: 300,
        portMappings: [
          {
            containerPort: 9000,
            hostPort: 0,
            protocol: 'tcp'
          }
        ],
        environment: [
          {
            name: 'NODE_ENV',
            value: 'test'
          },
          {
            name: 'REACT_APP_USERS_SERVICE_URL',
            value: 'tbd'
          },
          {
            name: 'REACT_APP_MOVIES_SERVICE_URL',
            value: 'tbd'
          }
        ],
        logConfiguration: {
          logDriver: 'awslogs',
          options: {
            'awslogs-group': 'microservicemovies',
            'awslogs-region': region
          }
        }
      },
    ],
    family: 'microservicemovies-review-web-td'
  };
  return taskDefinition;
}

module.exports = {
  createWebTaskDefinition
};