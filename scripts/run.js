const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  // We pass in "ninja" to the constructor when deploying
  const domainContract = await domainContractFactory.deploy("fart");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // We're passing in a second variable - value. This is the moneyyyyyyyyyy
  let txn = await domainContract.register("mortal",  {value: hre.ethers.utils.parseEther('0.1')});
  await txn.wait();

  await domainContract.connect(randomPerson).register("smelly", {value: hre.ethers.utils.parseEther('0.1')})
  const domainAddress = await domainContract.getAddress("smelly");

  console.log("address2", randomPerson.address)
  console.log("smelly address", domainAddress)

  let balance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  console.log('transfering: ', hre.ethers.utils.parseEther('1'))
    await domainContract.transferFunds("mortal", hre.ethers.utils.parseEther('1'));

  const address = await domainContract.getAddress("mortal");
  console.log("Owner of domain mortal:", owner.address);

  balance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();