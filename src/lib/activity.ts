import { prisma } from "./prisma";

export async function logActivity(params: {
  userName?: string;
  userRole?: string;
  action: "CREATE" | "UPDATE" | "DELETE" | "RESTORE" | "LOGIN" | "EXPORT";
  entityType: string;
  entityId?: string;
  details: string;
}) {
  try {
    await prisma.activityLog.create({
      data: {
        userName: params.userName || "System",
        userRole: params.userRole || "SUPER_ADMIN",
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        details: params.details,
      },
    });
  } catch (err) {
    console.error("Failed to log activity:", err);
  }
}

export async function stageDeletedItem(params: {
  entityType: string;
  entityId: string;
  entityName: string;
  originalData: any;
  deletedBy?: string;
}) {
  try {
    await prisma.deletedItem.create({
      data: {
        entityType: params.entityType,
        entityId: params.entityId,
        entityName: params.entityName,
        originalData: JSON.stringify(params.originalData),
        deletedBy: params.deletedBy || "Admin",
      },
    });
  } catch (err) {
    console.error("Failed to stage deleted item:", err);
  }
}
