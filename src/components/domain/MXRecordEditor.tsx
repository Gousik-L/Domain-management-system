import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { MXRecord } from '../../types/domain';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '../ui/Table';

interface MXRecordEditorProps {
  records: MXRecord[];
  onUpdate: (id: string, updates: Partial<MXRecord>) => void;
  onAdd: (record: Omit<MXRecord, 'id'>) => void;
  onDelete: (id: string) => void;
}

export const MXRecordEditor: React.FC<MXRecordEditorProps> = ({
  records,
  onUpdate,
  onAdd,
  onDelete,
}) => {
  const [editingRecord, setEditingRecord] = useState<string | null>(null);
  const [newRecord, setNewRecord] = useState({
    domainId: '1', // This would be dynamic in a real app
    hostname: '@',
    priority: 10,
    target: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSave = (record: MXRecord) => {
    onUpdate(record.id, record);
    setEditingRecord(null);
  };

  const handleAdd = () => {
    if (newRecord.target.trim()) {
      onAdd(newRecord);
      setNewRecord({
        domainId: '1',
        hostname: '@',
        priority: 10,
        target: '',
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">MX Records</h1>
        <p className="text-gray-600">
          Configure mail exchange records for your domains to handle email delivery.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Email Configuration</h3>
            <Button
              icon={Plus}
              onClick={() => setShowAddForm(true)}
              size="sm"
            >
              Add MX Record
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-4">Add New MX Record</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  label="Hostname"
                  value={newRecord.hostname}
                  onChange={(value) => setNewRecord({ ...newRecord, hostname: value })}
                  placeholder="@"
                />
                <Input
                  label="Priority"
                  type="number"
                  value={newRecord.priority.toString()}
                  onChange={(value) => setNewRecord({ ...newRecord, priority: parseInt(value) || 10 })}
                  placeholder="10"
                />
                <Input
                  label="Target"
                  value={newRecord.target}
                  onChange={(value) => setNewRecord({ ...newRecord, target: value })}
                  placeholder="mail.example.com"
                />
                <div className="flex items-end space-x-2">
                  <Button onClick={handleAdd} size="sm" className="flex-1">
                    Add
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowAddForm(false)}
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableHeaderCell>Hostname</TableHeaderCell>
              <TableHeaderCell>Priority</TableHeaderCell>
              <TableHeaderCell>Target</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    {editingRecord === record.id ? (
                      <Input
                        value={record.hostname}
                        onChange={(value) => onUpdate(record.id, { hostname: value })}
                        className="w-24"
                      />
                    ) : (
                      <span className="font-mono text-sm">{record.hostname}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRecord === record.id ? (
                      <Input
                        type="number"
                        value={record.priority.toString()}
                        onChange={(value) => onUpdate(record.id, { priority: parseInt(value) || 10 })}
                        className="w-20"
                      />
                    ) : (
                      <span className="font-mono text-sm">{record.priority}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRecord === record.id ? (
                      <Input
                        value={record.target}
                        onChange={(value) => onUpdate(record.id, { target: value })}
                        className="min-w-48"
                      />
                    ) : (
                      <span className="font-mono text-sm">{record.target}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {editingRecord === record.id ? (
                        <>
                          <Button
                            size="sm"
                            icon={Save}
                            onClick={() => handleSave(record)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setEditingRecord(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setEditingRecord(record.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            icon={Trash2}
                            onClick={() => onDelete(record.id)}
                          />
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {records.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No MX Records</h3>
              <p className="text-gray-600 mb-4">
                Add MX records to configure email delivery for your domains.
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                Add Your First MX Record
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Common Email Providers</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Google Workspace</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Priority: 1, Target: aspmx.l.google.com</p>
                <p>• Priority: 5, Target: alt1.aspmx.l.google.com</p>
                <p>• Priority: 5, Target: alt2.aspmx.l.google.com</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Microsoft 365</h4>
              <div className="text-sm text-gray-600">
                <p>• Priority: 0, Target: yourdomain-com.mail.protection.outlook.com</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};