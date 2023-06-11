import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  PublicKey,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import {
  DataV2,
  createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
import { AuthorityType, createMint, createSetAuthorityInstruction, getMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import base58 from "bs58";
import {type WalletAdapterProps} from '@solana/wallet-adapter-base';
import { MintingStatus } from "@/redux/slice/appSlice";
import { FieldValues } from "react-hook-form";


/**
 * 
 * @param connection - Connection
 * @param publicKey - Public key of the account
 * @param sendTransaction - Send transaction from useWallet
 * @param wallet - Wallet from useWallet
 * @param data - form data
 */

export const createToken =  async(connection: Connection, publicKey: PublicKey, sendTransaction: WalletAdapterProps['sendTransaction'], wallet: WalletContextState, data: FieldValues): Promise<MintingStatus> => { 
  try {
    const owner = Keypair.fromSecretKey(base58.decode(`${process.env.NEXT_PUBLIC_MY_WALLET}`)) || "";
  
    const createMetadata = async (
      connection: Connection,
      metaplex: Metaplex,
      mint: PublicKey,
      user: Keypair,
      name: string,
      symbol: string,
      description: string
    ) => {
      // const file = toMetaplexFile(
      //   "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png",
      //   "3408.png"
      //   );
        // const imageUri = await metaplex.storage().upload(file);
        // console.log(imageUri);
        const { uri } = await metaplex.nfts().uploadMetadata({
          name: name,
          description: description,
        image: data.image,
      });
      
      const tokenMetadata = {
        name: name,
        symbol: symbol,
        uri: uri,
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null,
      } as DataV2;
      const metadataPDA = await metaplex.nfts().pdas().metadata({ mint });
      const transaction = new Transaction().add(
        createCreateMetadataAccountV3Instruction(
          {
            metadata: metadataPDA,
            mint: mint,
            mintAuthority: owner.publicKey!,
            payer: owner.publicKey!,
            updateAuthority: owner.publicKey!,
          },
          {
            createMetadataAccountArgsV3: {
              data: tokenMetadata,
              isMutable: true,
              collectionDetails: null,
            },
          }
          )
          );
          
          // send transaction
          const transactionSignature = await sendAndConfirmTransaction(connection, transaction, [owner]);
          await connection.confirmTransaction(transactionSignature, "finalized");

    };
  
    const createTokens = async () => {
      const fee = await getPayment();
      if (!fee) return 'error';
      const MINT_ADDRESS = await createMint(
        connection,
        owner,
        owner.publicKey,
        owner.publicKey,
        0 // We are using 9 to match the CLI decimal default exactly
        );
        
        const mintInfo = await getMint(connection, MINT_ADDRESS);
        console.log(mintInfo);
  
        const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(owner))
        .use(
          bundlrStorage({
            address: "https://node1.bundlr.network",
            providerUrl: `${process.env.NEXT_PUBLIC_MAINNET_RPC}`,
            timeout: 60000,
          })
          )
          .use(walletAdapterIdentity(wallet));
          await createMetadata(
            connection,
            metaplex,
            new PublicKey(MINT_ADDRESS),
            owner,
            data.name, // Token name - REPLACE THIS WITH YOURS
            data.symbol, // Token symbol - REPLACE THIS WITH YOURS
            data.description // Token description - REPLACE THIS WITH YOURS
      );
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        owner,
        MINT_ADDRESS,
        publicKey!
      );
      
      await mintTo(
        connection,
        owner,
        MINT_ADDRESS,
        tokenAccount.address,
        owner.publicKey!,
        data.amount 
        );
      const transactionAuthority = new Transaction()
      .add(
          createSetAuthorityInstruction(
            MINT_ADDRESS,
            owner.publicKey,
            AuthorityType.MintTokens,
            publicKey!
          ))
      .add(
        createSetAuthorityInstruction(
          MINT_ADDRESS,
          owner.publicKey,
          AuthorityType.FreezeAccount,
          publicKey!
        )
      );
      
      const transactionSignature = await sendAndConfirmTransaction(connection, transactionAuthority, [owner]);
      await connection.confirmTransaction(transactionSignature, "confirmed");
      return true
    };
  
    const getPayment = async () => {
      try {
        if (!publicKey) return;
        const tx = new Transaction();
        const transactionInstruction = SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: owner.publicKey,
          lamports: 0.05 * LAMPORTS_PER_SOL,
        });
        
        tx.add(transactionInstruction);
  
        const signed = await sendTransaction(tx, connection);
        const confirmed = await connection.confirmTransaction(signed, "confirmed");
        return confirmed;
      } catch (err) {
        return false;
      }
    }
  
    const res = await createTokens()
    if(res === 'error') return 'error';
    return 'success'
  } catch (error) {
    return 'error'
  }
}