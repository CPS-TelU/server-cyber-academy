// repositories/submissionRepository.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SubmissionRepository {
    // Create a new submission
    async createSubmission({ file, groupId, taskId, userId, status}) {
        return await prisma.submission.create({
            data: {
                file,
                group: {
                    connect: { id: groupId }, // Connect to the existing group
                },
                task: {
                    connect: { id: taskId }, // Connect to the existing task
                },
                user: {
                    connect: { id: userId }, // Connect to the existing user
                },
                status: status
            },
        });
    }

    // Fetch submissions for a specific group
    async getSubmissionsByGroupId(groupId) {
        return await prisma.submission.findMany({
            where: {
                group_id: Number(groupId),
            },
            include: {
                user: true, // Include user information if needed
            },
        });
    }

    // Delete a submission by ID
    async deleteSubmission(submissionId) {
        return await prisma.submission.delete({
            where: {
                id: Number(submissionId) // Ensure the ID is a number
            }
        });
    }

    async findAllSubmissions() {
        return await prisma.submission.findMany();
      };
}

module.exports = new SubmissionRepository();
