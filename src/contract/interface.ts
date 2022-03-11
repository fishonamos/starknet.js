import { Account } from '../account';
import { Provider } from '../provider';
import {
  Abi,
  AddTransactionResponse,
  AsyncContractFunction,
  ContractFunction,
  Invocation,
  Result,
} from '../types';

export abstract class ContractInterface {
  public abstract abi: Abi;

  public abstract address: string;

  public abstract providerOrAccount: Provider | Account;

  public abstract deployTransactionHash?: string;

  readonly functions!: { [name: string]: AsyncContractFunction };

  readonly callStatic!: { [name: string]: AsyncContractFunction };

  readonly populateTransaction!: { [name: string]: ContractFunction };

  readonly estimateFee!: { [name: string]: ContractFunction };

  readonly [key: string]: AsyncContractFunction | any;

  /**
   * Saves the address of the contract deployed on network that will be used for interaction
   *
   * @param address - address of the contract
   */
  public abstract attach(address: string): void;

  /**
   * Attaches to new Provider or Account
   *
   * @param providerOrAccount - new Provider or Account to attach to
   */
  public abstract connect(providerOrAccount: Provider | Account): void;

  /**
   * Resolves when contract is deployed on the network or when no deployment transaction is found
   *
   * @returns Promise that resolves when contract is deployed on the network or when no deployment transaction is found
   * @throws When deployment fails
   */
  public abstract deployed(): Promise<ContractInterface>;

  /**
   * Calls a method on a contract
   *
   * @param method name of the method
   * @param args Array of the arguments for the call
   * @returns Result of the call as an array with key value pars
   */
  public abstract call(method: string, args?: Array<any>): Promise<Result>;

  /**
   * Invokes a method on a contract
   *
   * @param method name of the method
   * @param args Array of the arguments for the invoke
   * @returns Add Transaction Response
   */
  public abstract invoke(method: string, args?: Array<any>): Promise<AddTransactionResponse>;

  /**
   * Calls a method on a contract
   *
   * @param method name of the method
   * @param args Array of the arguments for the call
   */
  public abstract estimate(method: string, args?: Array<any>): Promise<any>;

  /**
   * Calls a method on a contract
   *
   * @param method name of the method
   * @param args Array of the arguments for the call
   * @returns Invocation objet
   */
  public abstract populate(method: string, args?: Array<any>): Invocation;
}