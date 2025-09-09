# OpenSpare

**OpenSpare** is an open-source initiative to design and share replacement part for appliances, with the goal of extending their lifespan and reducing our environmental impact.

## 🚀 Why OpenSpare?

Many appliances break down because of simple parts:  
- burnt-out control boards,  
- worn-out mechanical buttons,  
- broken plastic pieces that are no longer available.  

Manufacturers often don’t / no longer provide these parts, or only at a prohibitive cost.  
OpenSpare offers an alternative: a **free library** of designs that anyone can reuse, modify, and manufacture.

We believe that access to open replacement parts is essential to make repair accessible to everyone.  
OpenSpare aims to become a **shared resource** that helps to:  
- extend the life of appliances,  
- reduce electronic waste,
- save money,  
- and strengthen the autonomy of users and repairers.  


## 📦 What’s in this repo?

### Printed Circuits

We provide source files of printed circuits designed with KiCad. Each design will include:

- KiCad source files (project, schematics, board) — freely reusable by anyone.
- Fabrication outputs (Gerber files, NC drill files, Bill of Materials) — ready for manufacturinf by anyone.

Note: Each design will have a documented release status, allowing some designs to be shared even if not yet tested.

### 3D models

[...]


## 🗂️ Repository Structure

- `kicad/` → component libraries (symbols, footprints & 3D models, some datasheets). 
- `parts/` → designs including source files and fabrication files.


## 🤝 Contributing

All contributions are welcome:  
- Adding new parts (PCB, 3D, documentation).  
- Improving existing designs.  
- Manufacturing, testing and sharing feedback. 

👉 A detailed contribution guide will be available in [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

This project is licensed under the **CERN Open Hardware Licence Version 2 – Weakly Reciprocal (CERN-OHL-W-2.0)**.

You are free to use, study, modify, and manufacture this hardware.  
If you modify the design files themselves, you must release those modifications under the same license.  
However, you are not required to release the source of larger products that merely incorporate this design.

For full details, see the [LICENSE](./LICENSE) file.
