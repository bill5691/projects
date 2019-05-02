// Program    : N Queens
// Authors    : Deanna Jacobs, Illaya Lane, Jacob Rhein, Bill Skiles
// File       : Queens.java
// Description: This class contains the functions used in the algorithm to
//              solve the N Queens problem.

public class Queens
{
	private int[] queens;        // chess board
	private int N;               // N x N board
	private int nSolutions = 0;  // number of solutions
	
	public Queens(int n)  // parameter: n x n board
	{
		this.N = n;
		queens = new int[n];
		
		for (int i = 0; i < n; i++)
		{
			queens[i] = i;
		}
		
		enumerate(0);
	}
	
	private boolean backtrack(int n)  // returns true if the queen in the current row conflicts with queens in previous rows
	{
		for (int i = 0; i < n; i++)
		{
			if ((queens[i] - queens[n]) == (n - i)) // tests major diagonal
			{
				return true;
			}
			
			if ((queens[n] - queens[i]) == (n - i)) // tests minor diagonal
			{
				return true;
			}
		}
		
		return false;
	}
	
	private void enumerate(int n)  // parameter: starting position on board
	{
		if (n == N)  // solution found
		{
			printBoard();
			nSolutions++;
			return;
		}
		
		for (int i = n; i < N; i++)  // keeps searching the next board position if a solution hasn't been found
		{
			exchange(n, i);
			
			if (!backtrack(n))  // if this position is in range of another queen, tries the next position
			{
				enumerate(n + 1);
			}
			
			exchange(i, n);
		}
	}
	
	private void exchange(int i, int n)  // exchanges positions in queens array
	{
		int temp = queens[i];
		queens[i] = queens[n];
		queens[n] = temp;
	}
	
	private void printBoard()  // prints the solutions for the n x n board
	{
		for (int i = 0; i < N; i++)
		{
			for (int j = 0; j < N; j++)
			{
				if (queens[i] == j)
				{
					System.out.print("Q ");
				}
				else
				{
					System.out.print("* ");
				}
			}
			
			System.out.print("\n");
		}
		
		System.out.print("\n");
	}
	
	public int getNSolutions()  // returns the number of solutions found
	{
		return nSolutions;
	}
}

