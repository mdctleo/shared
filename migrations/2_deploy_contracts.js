var SimpleStorage = artifacts.require("./SimpleStorage.sol");
const PostFactory = artifacts.require("./PostFactory.sol")

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(PostFactory);
};
