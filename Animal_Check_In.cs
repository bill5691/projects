// Program: PET-ER Animal Check-In
// Author: Bill Skiles
// Description: Basic concept for client check-in system for a veterinary emergency room where clients can check-in their pet
// prior to visiting the facility, similar to online patient check-in systems used by hospitals, clinics, and doctor offices. 
// Implementing this type of system can speed up the check-in process for both the client and emergency facility and can be
// used for quick client record lookup.

using System;
using System.Collections.Generic;

namespace Animal_Check_In
{
    // Constructor for new clients
    class Client
    {
        public string f_name;
        public string m_initial;
        public string l_name;
        public string p_name;
        public string p_gender;
        public int p_age;
        public string p_type;
        public string p_breed;
        public string p_neuter;
        public int client_id;
        public string visit_desc;

        public override string ToString()
        {
            return "\nFirst Name: " + f_name + 
                "\nMiddle Initial: " + m_initial + 
                "\nLast Name: " + l_name + 
                "\nPet Name: " + p_name + 
                "\nPet Gender: " + p_gender + 
                "\nPet Age: " + p_age + 
                "\nPet Type: " + p_type + 
                "\nPet Breed: " + p_breed + 
                "\nNeutered: " + p_neuter + 
                "\nClient ID: " + client_id + 
                "\nReason for visit:\n" + visit_desc;
        }
    }

    class Check_In_Application
    {
        static void Main(string[] args)
        {
            string fName;
            string mInitial;
            string lName;
            string pName;
            string pGender;
            string age;
            int pAge;
            string pType;
            string pBreed;
            string pNeuter = "";
            int clientId = 1;
            string visitDesc;
            bool exit_code = false;

            // Creates a List collection to store client records
            List<Client> clients = new List<Client>();

            Console.WriteLine("\nPET-ER Client Check-In\n");

            // Loop that enters client records until the user chooses to stop adding records
            do
            {
                Console.Write("\nOwner First Name: ");
                fName = Console.ReadLine();
                Console.Write("Owner Middle Initial: ");
                mInitial = Console.ReadLine();
                while (mInitial.Length > 1)
                {
                    Console.Write("Error - Enter one letter for M. Initial: ");
                    mInitial = Console.ReadLine();
                }
                Console.Write("Owner Last Name: ");
                lName = Console.ReadLine();
                Console.Write("Pet Name: ");
                pName = Console.ReadLine();
                Console.Write("Pet Gender(m/f): ");
                pGender = Console.ReadLine();
                while (!pGender.Equals("m") && !pGender.Equals("f"))
                {
                    Console.Write("Error - Enter \"m\" for male or \"f\" for female: ");
                    pGender = Console.ReadLine();
                }
                Console.Write("Pet Age: ");
                age = Console.ReadLine();
                while (!int.TryParse(age, out pAge))
                {
                    Console.Write("Error - Enter a number for age: ");
                    age = Console.ReadLine();
                }
                Console.Write("Pet Type: ");
                pType = Console.ReadLine();
                Console.Write("Pet Breed: ");
                pBreed = Console.ReadLine();
                // Switch statement that displays "neutered" or "spayed" based on the pet's gender
                switch (pGender)
                {
                    case "m":
                        Console.Write("Neutered?(y/n): ");
                        pNeuter = Console.ReadLine();
                        while (!pNeuter.Equals("y") && !pNeuter.Equals("n"))
                        {
                            Console.Write("Error - Enter \"y\" for yes or \"n\" for no: ");
                            pNeuter = Console.ReadLine();
                        }
                        break;
                    case "f":
                        Console.Write("Spayed?(y/n): ");
                        pNeuter = Console.ReadLine();
                        while (!pNeuter.Equals("y") && !pNeuter.Equals("n"))
                        {
                            Console.Write("Error - Enter \"y\" for yes or \"n\" for no: ");
                            pNeuter = Console.ReadLine();
                        }
                        break;
                }
                Console.Write("Reason for visit: ");
                visitDesc = Console.ReadLine();
                Console.WriteLine("\nAdding record...\n");

                // Adds a new client to the list using entered information
                clients.Add(new Client
                {
                    f_name = fName,
                    m_initial = mInitial,
                    l_name = lName,
                    p_name = pName,
                    p_gender = pGender,
                    p_age = pAge,
                    p_type = pType,
                    p_breed = pBreed,
                    p_neuter = pNeuter,
                    client_id = clientId,
                    visit_desc = visitDesc
                });

                // Increment client ID for each new client
                clientId++;

                Console.Write("Add another record?(y/n): ");
                if (Console.ReadLine().Equals("n"))
                {
                    exit_code = true;
                }

            } while (exit_code == false);

            Console.WriteLine("Displaying Client Records:");

            // Displays each recorded client in the list collection
            foreach (Client client in clients)
            {
                Console.WriteLine(client);
            }

            Console.ReadKey();

        }
    }
}
