// Program    : N Queens
// Authors    : Deanna Jacobs, Illaya Lane, Jacob Rhein, Bill Skiles
// File       : QueensDriver.java
// Description: This program calculates different solutions to the N Queens problem. Given an
//              n x n chess board, a queen piece is placed in any position where any other
//              queen cannot attack it. This program also sorts a random array of numbers
//              using bubble sort, then stores data found from N Queens solutions in a database.
//
//              ***NOTE***
//              In order for the database connection to be successful, the five JAR files for the
//              Ucanaccess driver must be added to the project's library. They are located in the
//              "connectors" folder in the "N Queens" folder.

import java.sql.*;
import java.util.*;
import javax.swing.JFrame;

public class QueensDriver 
{
	public static void main(String[] args) 
	{
		int boardSize;
		ArrayList<Integer> sizes = new ArrayList<Integer>();
		ArrayList<Integer> solutions = new ArrayList<Integer>();
		String entry;
		String driver = "jdbc:ucanaccess://";
		String filePath = "e://211 Java//workspace//Final Project//nqueens.accdb";  // Change filepath location to where the database file is located
		boolean success = true;							    // (ex. e://N Queens//nqueens.accdb)

		System.out.print("\n\n\t\t     N Queens\n\n");
		System.out.print("  Prints all possible positions to place Queens on a\n  N x N chess board in which none can attack another\n\n");
		
		Scanner scan = new Scanner(System.in);
		
		do
		{
			System.out.print("  Enter the row length of the chess board: ");
			boardSize = scan.nextInt();

			System.out.print("\n");
			
			Queens queens = new Queens(boardSize);
			
			sizes.add(boardSize);
			solutions.add(queens.getNSolutions());
			
			System.out.print("  Number of possible solutions: " + queens.getNSolutions() + "\n\n");
			System.out.print("  Try another board size? (Y/N): ");
			entry = scan.next();
			
			System.out.print("\n");
			
		}while(entry.equalsIgnoreCase("y"));

		System.out.print("  Would you like to sort some random numbers? (Y/N): ");
		if (scan.next().equalsIgnoreCase("y"))
		{
			System.out.print("\n");
			
			int [] array = new int[15];
			
			for (int i = 0; i < array.length; i++)
			{
				array[i] = (int)(Math.random() * 100);
			}
			
			System.out.println("  Original sequence of numbers: ");
			
			for (int j = 0; j < array.length; j++)
			{
				System.out.print("  " + array[j]);
			}
			
			System.out.print("\n\n");
			
			bubbleSort(array);
			
			System.out.println("  New Bubble sorted sequence of numbers: ");
			
			for (int k = 0; k < array.length; k++)
				System.out.print("  " + array[k]);
			System.out.println("\n");
		}
		
		try
		{
			Connection conn = DriverManager.getConnection(driver + filePath);
			
			if (conn != null)
			{
				PreparedStatement pstmt = null;
				
				for (int i = 0; i < sizes.size(); i++)
				{
					String q = "INSERT INTO queens ([n_size], [solutions]) VALUES (?, ?)";
					pstmt = conn.prepareStatement(q);
					pstmt.setInt(1, sizes.get(i));
					pstmt.setInt(2, solutions.get(i));
					pstmt.executeUpdate();
				}

				JFrame frame = new JFrame("Success");
				frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
				
				QueensPanel message = new QueensPanel(success);
				frame.getContentPane().add(message);
				frame.pack();
				frame.setVisible(true);
				
				conn.close();
			}
		}
		catch (Exception e)
		{
			success = false;
			
			JFrame frame = new JFrame("Error");
			frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			
			QueensPanel message = new QueensPanel(success);
			frame.getContentPane().add(message);
			frame.pack();
			frame.setVisible(true);
		}
		
		scan.close();
	}
	
	public static void bubbleSort(int[] sort)
	{
		int holder;
		boolean factor = true;
		
		while (factor)
		{
			factor = false;
			
			for (int i = 0; i < sort.length - 1; i++)
			{
				//swaps the two numbers if needed
				if (sort[i] >  sort[i+1])
				{
					holder = sort[i];
					sort[i] = sort[i+1];
					sort[i+1] = holder;
					
					//turns true to show a swap occurred 
					factor = true;
				}
			}
		}
	}
}
