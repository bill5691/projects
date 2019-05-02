// Program    : N Queens
// Authors    : Deanna Jacobs, Illaya Lane, Jacob Rhein, Bill Skiles
// File       : Queens.java
// Description: This class sets up the JFrame used when the database connection
//              was successful or unsuccessful.

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class QueensPanel extends JPanel
{
	private JButton exit;
	private JLabel label;
	
	public QueensPanel(boolean success)
	{
		exit = new JButton("Exit");
		exit.addActionListener(new ButtonListener());
		
		if (success)
		{
			label = new JLabel("Success: Database updated!");
		}
		else
		{
			label = new JLabel("Error: Couldn't connect to database");
		}

		add(label);
		add(exit);
		
		setPreferredSize(new Dimension(300, 50));
	}
	
	private class ButtonListener implements ActionListener
	{
		public void actionPerformed(ActionEvent action)
		{
			System.exit(0);
		}
	}
}
