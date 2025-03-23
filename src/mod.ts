import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";

class Mod implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void
    {
        // get database from server
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        // Get all the in-memory json found in /assets/database
        const tables: IDatabaseTables = databaseServer.getTables();

        for (const hideoutAreaData of Object.values(tables.hideout.areas)) 
        {
            for (const stage of Object.values(hideoutAreaData.stages)) 
            {
                const requirements = stage.requirements;
                if (requirements && requirements.length > 0) 
                {
                    for (const requirement of requirements) 
                    {
                        if (Object.prototype.hasOwnProperty.call(requirement, "isSpawnedInSession"))
                        {
                            requirement.isSpawnedInSession = false;
                        }
                    }
                }
            }
        }

        console.log("[SCHKRM] No FIR Hideout loaded.")
    }
}

export const mod = new Mod();
