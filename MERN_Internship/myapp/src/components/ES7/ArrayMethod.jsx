import React from "react";

export default function ArrayMethod() {
    
  const Student = [
    {
      name: "user",
      email: "user@gmail.com",
      phone: 1234567890,
      address: "mangalore",
    },
    {
      name: "prashanti",
      email: "prashanti@gmail.com",
      phone: 987654321,
      address: "bangalore",
    },
    {
      name: "gowri",
      email: "gowri@gmail.com",
      phone: 4567897654,
      address: "udupi",
    },
    {
      name: "sowmya",
      email: "sowmya@gmail.com",
      phone: 6545687654,
      address: "rajajinagar",
    },
  ];
  console.log(Student);

  //   const num = [1, 2, 3, 4, 5, 6];
  //   document.write(num)

  return (
    <div>
      {/* {num.map((n) => (
        <h3>{n}</h3>
      ))}

      {Student.map((stud) => (
        <h3>{stud.name}</h3>
        
        
      ))} */}
      <table
        border={1}
        style={{ margin: "20px auto", width: "80%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {Student.map((stud) => (
            <tr>
              <td>{stud.name}</td>
              <td>{stud.email}</td>
              <td>{stud.phone}</td>
              <td>{stud.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


