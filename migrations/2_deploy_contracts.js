const PostFactory = artifacts.require("./PostFactory.sol")

module.exports = function(deployer) {
  deployer.deploy(PostFactory);
};
