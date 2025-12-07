import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export async function GET() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "SANITY_API_WRITE_TOKEN bulunamadı." }, { status: 401 });
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const logs: string[] = [];

  try {
    // Get all team members
    const teamMembers = await client.fetch(`*[_type == "teamMember"]`);
    
    // Delete each team member
    for (const member of teamMembers) {
      await client.delete(member._id);
      logs.push(`Deleted: ${member.name}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: `${teamMembers.length} team member silindi.`,
      logs 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, logs }, { status: 500 });
  }
}
