# Solana Escrow

> Multi sig wallet setup to do escrow for idea investments and bounties

## Idea investment marketplace

Currently [escrow](escrow) contains code for an idea marketplace (unfinished).

Goal there is to create a multisig wallet or some derived address with 2/3 private key threshold.

User writes up an idea (i.e. build CLI to get posts from X). And says they can do it for 500$ in 4 days (for example).

Then another person comes in and trusts the idea can be delivered by the person. They take the 500$ and put it in the multisig.

Happy case is after 4 days, they talk, if all happy, they sign the multisig, the money gets deposited on idea creator's account. And the investor gets the idea they paid for.

Unhappy case is both agree work was not done to good quality. They sign the multisig, money gets deposited back to the investor.

Third case is the conflict. Investor says, idea was done in bad quality, but the other person disagrees. Someone would then come to resolve the conflict.

They can set the reward to a % so it does not have to be binary. The person resolving the conflict will have idea spec, all the immutable chat logs and more to make a fair decision. As well as incentive not to cheat. This will be integrarated into [LA](https://github.com/learn-anything/learn-anything.xyz) once it's built.

If you're interested in building this together, [message on Discord](https://discord.com/invite/bxtD8x6aNF).

## Digital marketplace

Will be [Gumroad](https://gumroad.com/) clone but with Solana support and only 0.5 % comission. Also integrated as part of [LA](https://github.com/learn-anything/learn-anything.xyz).

Uses [Nightly Connect](https://connect.nightly.app/docs/) for wallet management. And [Sphere Pay](https://spherepay.co/) for processing payments.

Current goal is to integrate the digital marketplace into LA asap.

### Setup

[Bun](https://bun.sh/) is used to run things.

```
bun i
```

### Run

```
bun dev
```

Open http://localhost:3000
